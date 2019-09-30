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

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent{
  

  listaPreguntaOut = new Array<Question>();
  usuario       = JSON.parse(localStorage.getItem("usuario"));
  activity      = new Activity();
  
  step          = 0;
  question      : string ;
  listaAnswer   : Answer[]
  profesor      : Usuario;
  tipoActividad : Parametro;
  estado        : Parametro;
  questionOriginal : Question;

  constructor(private  dialog:  MatDialog) {} 

  setStep(index: number) { this.step = index; }
  nextStep() { this.step++; }
  prevStep() { this.step--; }

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

  onQuestion(value: string) { 
    this.question = value; 
  }

  recepcionPreguntas (listaAnswer: Answer[]){
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

  recepcionTema (topic : Topic){
    this.activity.tema = topic;
    this.confirmation();
  }

  clearObject () {
    this.activity         = new Activity();
    this.listaPreguntaOut = new Array<Question>();
  }

  createActivity(){
    this.activity.listaPregunta = this.listaPreguntaOut;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.activity;
    const dialogRef =  this.dialog.open(ModalConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clearObject ();
      this.clearInputs();
      this.setStep(0);

      swal.fire(
        'Good job!',
        'Your activity will appear in your classes!',
        'success'
      )

    });
  }

  
}
