import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Question } from "src/modelo/question";
import { Answer } from "src/modelo/answer";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivityRealService } from "src/services/activity-real.service";
import { ParametroUtil } from "src/app/util/parametroUtil";
import { Usuario } from "src/modelo/usuario";
import { interval } from "rxjs";

@Component({
  selector: "app-alternative-student",
  templateUrl: "./alternative-student.component.html",
  styleUrls: ["./alternative-student.component.css"]
})
export class AlternativeStudentComponent implements OnInit {
  
  listaPreguntas = new Array<Question>();
  questionSelected = new Question();
  preguntas: Array<Answer> = [];
  usuarioSession: Usuario;

  codigoActividad: string;
  posicionPregunta = 0;

  firsTime: boolean = false;

  arrPreguntasDesahabilitadas = [];

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private activityRealService: ActivityRealService
  ) {
    this.spinner.show();
    this.usuarioSession = JSON.parse( localStorage.getItem(ParametroUtil.USER_STORAGE) );
    this.codigoActividad = this.route.snapshot.queryParamMap.get("codigo");
    this.arrPreguntasDesahabilitadas.push(-1);
  }

  ngOnInit() {

    // Leer  a activity-real/{codigo}/questions
    this.activityRealService
      .listenerParticipant(this.codigoActividad)
      .snapshotChanges()
      .subscribe(item => {
        this.listaPreguntas = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.listaPreguntas.push(x as Question);
        });
        this.listenerPreguntas();
      });
  }

  listenerPreguntas() {
    this.listaPreguntas.forEach(element => {
      this.iniciarListenerPregunta(element.$key);
    });
  }

  iniciarListenerPregunta(key: string) {
    this.activityRealService
      .listenerPregunta(this.codigoActividad, key)
      .snapshotChanges()
      .subscribe(item => {
        var x = item.payload.toJSON();
        if (this.arrPreguntasDesahabilitadas.indexOf(x) == -1) {
          this.arrPreguntasDesahabilitadas.push(x);
          this.spinner.hide();
          this.posicionPregunta = parseInt(x.toString(), 0);
          this.inicializarCuenta(this.posicionPregunta);
        }
      });
  }

  inicializarCuenta(posicion: number) {
    this.selectedQuestion(posicion);
 //   this.startCountDown(20);
  }

  selectedQuestion(posicion: number) {
    this.questionSelected = this.listaPreguntas[posicion];
    this.preguntas = new Array<Answer>();

    for (let index = 0; index < 4; index++) {
      try {
        var answer = this.questionSelected.listaRespuestas[index];
        if (answer.respuesta) {
          this.preguntas.push(answer);
        }
      } catch (ex) {}
    }
  }

  respuestaSeleccionada(respuesta: Answer, position: string) {
    this.spinner.show();

    var usuarioClean = new Usuario();
    usuarioClean.codigo = this.usuarioSession.codigo;
    usuarioClean.nombres = this.usuarioSession.nombres;
    usuarioClean.apellidos = this.usuarioSession.apellidos;
    usuarioClean.codigoRespuesta = position;

    this.activityRealService.registrarParticipanteRespuestas(
      this.codigoActividad,
      this.questionSelected.$key,
      usuarioClean
    );
  }

  startCountDown(seconds) {
    var counter = seconds;

    var interval = setInterval(() => {
      counter--;
      if (counter < 0) {
        clearInterval(interval);
        this.spinner.show();
        this.posicionPregunta++;
      }
    }, 1000);
  }

  ayuda() {
    this.posicionPregunta--;
  }
}
