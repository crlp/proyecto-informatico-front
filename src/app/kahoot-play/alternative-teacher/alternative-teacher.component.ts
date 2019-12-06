import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/shared/modelo/question';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivityRealService } from 'src/shared/services/activity-real.service';
import { Usuario } from 'src/shared/modelo/usuario';
import { Answer } from 'src/shared/modelo/answer';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ResultQuestionModalComponent } from '../result-question-modal/result-question-modal.component';
import { AlternativeStudentComponent } from '../alternative-student/alternative-student.component';



@Component({
  selector: 'app-alternative-teacher',
  templateUrl: './alternative-teacher.component.html',
  styleUrls: ['./alternative-teacher.component.css']
})
export class AlternativeTeacherComponent implements OnInit{

  preguntaSelected  = new Question();
  participantes     = 0;
  indicePregunta    = 0;
  contador          = 0;
  contadorI         = 0;
  listaPreguntas    : Array<Question> = [];
  listaParticipants : Array<Usuario> = [];
  codigoActividad   : string;
  firstTime : boolean = false;

  

  constructor(private route: ActivatedRoute, private spinner : NgxSpinnerService, private activityRealService : ActivityRealService
    ,private  dialog:  MatDialog) {

     }

  ngOnInit() {
    this.codigoActividad = this.route.snapshot.queryParamMap.get("codigo");
    this.listenerTime()

    this.activityRealService.registraPreguntaActiva(this.codigoActividad, this.preguntaSelected.$key, 0); //Registrar primera pregunta activa
        
  }

  listenerTime(){
    this.activityRealService.listenerParticipant(this.codigoActividad)
      .snapshotChanges().subscribe(item => {
            this.listaPreguntas = [];
            item.forEach(element => {
              var x = element.payload.toJSON()
              x["$key"] = element.key;
              this.listaPreguntas.push(x as Question);
            });

            if(!this.firstTime){
              this.firstTime = true
              this.inicializarCuenta();
            }
    });
  }

  inicializarCuenta(){
    this.selectedQuestion();
    this.startCountDown()
  }


  
  selectedQuestion() {
    
    var listaRespuesta = new Array<Answer>()

    if( this.indicePregunta < this.listaPreguntas.length){

      this.preguntaSelected = this.listaPreguntas[this.indicePregunta];
      
      if(this.preguntaSelected){

        for (let index = 0; index < 4; index++) {
          try{
            var answer = this.preguntaSelected.listaRespuestas[index];
            if(answer.respuesta){
              listaRespuesta.push(answer);
            }
          }
          catch (ex) {}
        }

        this.preguntaSelected.listaRespuestas = listaRespuesta;

        this.activityRealService.listenerParticipantes(this.codigoActividad, this.preguntaSelected.$key)
          .snapshotChanges().subscribe(item => {
            this.listaParticipants = [];
            item.forEach(element => {
              var x = element.payload.toJSON()
              x["$key"] = element.key;
              this.listaParticipants.push(x as Usuario);
            });
            this.participantes = this.listaParticipants.length;
          });
      }else {
        this.actividadTerminada();
      }
    }else {
      this.actividadTerminada();
    }
  }

  actividadTerminada(){
    alert('Finalizo las preguntas');
    
  }

  startCountDown(){
    this.contador = 20;
     var interval = setInterval(() => {
      if(this.contador > 0) {
        this.contador--;
      } else {
        clearInterval(interval);
        this.indicePregunta ++;
        this.createActivity()
      }
    },1000)
  }

  createActivity(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {pregunta : this.preguntaSelected, codigoActividad : this.codigoActividad}

    
    const dialogRef =  this.dialog.open(ResultQuestionModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result == 'Go'){
        this.activityRealService.registraPreguntaActiva(this.codigoActividad, this.preguntaSelected.$key, this.indicePregunta);
        this.inicializarCuenta();
      }
    });
  
  }

}
