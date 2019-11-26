import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig} from  '@angular/material';

import { ModalConfirmationComponent } from '../../../modal/activity/modal-confirmation/modal-confirmation.component';
import { Activity } from 'src/modelo/activity';
import { Question } from 'src/modelo/question';
import { Usuario } from 'src/modelo/usuario';
import { Parametro } from 'src/modelo/param';
import { Answer } from 'src/modelo/answer';
import { Topic } from 'src/modelo/topic';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Metodo } from 'src/app/util/metodo';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent{
  
  listaAnswer       : Answer[]  = [];
  listaPreguntaOut  : Question[]= [];
  profesor          : Usuario   = null;
  tipoActividad     : Parametro = null;
  estado            : Parametro = null;
  questionOriginal  : Question  = null;
  usuario           : Usuario   = null
  activity          : Activity  = null;

  step              = 0;
  messageErrorTema  = false;
  question          = '' ;


  constructor( private  dialog:  MatDialog ) {
    this.activity = new Activity();
    this.usuario  = JSON.parse(localStorage.getItem(ParametroUtil.USER_STORAGE));
  } 

  setStep( index: number ) { 
    this.step = index; 
  }

  nextStep() { 
    this.step++; 
  }
  prevStep() { 
    this.step--;
  }

  confirmation(){
    
    //creando objeto profesor
    this.profesor =  new Usuario();
    this.profesor.codigo = this.usuario.codigo;
    this.activity.profesor = this.profesor;

    //creando objeto actividad
    this.tipoActividad = new Parametro();
    this.tipoActividad.codigo = '67';
    this.activity.tipoActividad = this.tipoActividad;

    //creando titulo y descripcion
    this.activity.titulo = '';
    this.activity.descripcion = '';

    //estado pendiente ... del combo estado (falta)
    this.estado = new Parametro();
    this.estado.codigo = '63';
    this.activity.estado = this.estado;
  }

  onQuestion( value: string ) { 
    this.question = value; 
  }

  recepcionPreguntas ( listaAnswer: Answer[] ){
    this.questionOriginal = new Question();
    this.questionOriginal.pregunta = this.question;
    this.questionOriginal.listaRespuestas = listaAnswer;

    this.estado = new Parametro();
    this.estado.codigo = '70';  
    this.questionOriginal.estado = this.estado;

    this.listaPreguntaOut.push(this.questionOriginal);  
    
    this.setStep(1);
    this.clearInputs();
  }

  clearInputs(){
    this.question = '';
  }

  recepcionTema ( topic : Topic){
    this.activity.tema = topic;
    this.confirmation();
  }

  clearObject () {
    this.activity         = new Activity();
    this.listaPreguntaOut = [];
  }

  createActivity(){
    
    this.activity.listaPregunta = this.listaPreguntaOut;
    this.activity.estado = this.estado
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.activity;
    const dialogRef =  this.dialog.open(ModalConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.clearObject ();
      this.clearInputs();
      this.setStep(0);
    });
  }

  
}
