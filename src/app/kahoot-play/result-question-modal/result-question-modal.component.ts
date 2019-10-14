import { Component, OnInit, Inject } from '@angular/core';

import * as CanvasJS from '../../../lib/canvasjs.min';
import { ActivityRealService } from 'src/services/activity-real.service';
import { Usuario } from 'src/modelo/usuario';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Question } from 'src/modelo/question';

@Component({
  selector: 'app-result-question-modal',
  templateUrl: './result-question-modal.component.html',
  styleUrls: ['./result-question-modal.component.css']
})
export class ResultQuestionModalComponent implements OnInit {

  lista = []
  listaParticipantes : Array<Usuario>
  pregunta  : Question;
  codigoActividad : string;
  constructor(private  dialogRef:  MatDialogRef<ResultQuestionModalComponent>, 
    private activityRealService : ActivityRealService, @Inject(MAT_DIALOG_DATA) data : any,  private route: ActivatedRoute) {
      this.pregunta = data.pregunta;
      this.codigoActividad = data.codigoActividad;
    }
  
  ngOnInit() {

    this.codigoActividad = this.route.snapshot.queryParamMap.get("codigo");
    this.activityRealService.listenerParticipantes(this.codigoActividad, this.pregunta.$key).snapshotChanges().subscribe(item => {   
      this.listaParticipantes = new Array<Usuario> ()
      item.forEach(element => {
        var x = element.payload.toJSON()
        x["$key"] = element.key;
        this.listaParticipantes.push(x as Usuario);
      });
     
      this.llenarGrafico()
     });
  }

  llenarGrafico() {
    this.lista = []
    var respuestas = []

    var respuesta1 = 0;
    var respuesta2 = 0;
    var respuesta3 = 0;
    var respuesta4 = 0;

    this.listaParticipantes.forEach(element => {
      if(element.codigoRespuesta == '0'){
        respuesta1 ++;
      }else if (element.codigoRespuesta == '1'){
        respuesta2 ++;
      }else if (element.codigoRespuesta == '2'){
        respuesta3 ++;
      }else if (element.codigoRespuesta == '3'){
        respuesta4 ++;
      }
    });

    respuestas = [respuesta1,respuesta2,respuesta3,respuesta4]
    for (let index = 0; index <  this.pregunta.listaRespuestas.length; index++) {
      var answer = this.pregunta.listaRespuestas[index]
      if(answer.respuesta != '') {
        var respuesta = respuestas[index];
        this.lista.push({y: respuesta , label: answer.respuesta, color: answer.flagCorrecto.codigo == '69' ? "red": "blue" })
      }
    }
   
      

    this.loadGraphics();
  }

  loadGraphics(){
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Summary of interactions in the question"
      },
      data: [{
        type: "column",
        dataPoints: this.lista
      }]
    });
    chart.render();
  }

  close (){
    this.dialogRef.close();
  }

  comenzarSiguiente(){
    this.dialogRef.close("Go");
  }
}
