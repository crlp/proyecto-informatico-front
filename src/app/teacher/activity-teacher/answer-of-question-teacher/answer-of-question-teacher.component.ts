import { Component, EventEmitter, Output} from '@angular/core';
import { Answer } from 'src/shared/modelo/answer';
import { Parametro } from 'src/shared/modelo/param';
import { Metodo } from 'src/app/util/metodo';
import { MatButton } from '@angular/material';


@Component({
  selector: 'app-answer-of-question-teacher',
  templateUrl: './answer-of-question-teacher.component.html',
  styleUrls: ['./answer-of-question-teacher.component.css']
})

export class AnswerOfQuestionTeacherComponent{

  answer1   : string;
  answer2   : string;
  answer3   : string;
  answer4   : string;


  textButton1 = 'Incorrect'
  textButton2 = 'Incorrect'
  textButton3 = 'Incorrect'
  textButton4 = 'Incorrect'

  toggleButton1 = false;
  toggleButton2 = false;
  toggleButton3 = false;
  toggleButton4 = false;

  button3 = null

  @Output() public childEvent =  new EventEmitter
  
  myFlagForButtonToggle : boolean = true;

  constructor() { }
 
  clearInputs(){
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
  }

  confirmarPreguntas(){
    this.setDataAnswer();
  }

  enviarCorrecto(position : number){
    this.initButton();
    switch(position){
      case 1:
        this.textButton1 = 'Correct' 
        this.toggleButton1 = true;
        break;
      case 2:
        this.textButton2 = 'Correct' 
        this.toggleButton2 = true;
        break;
      case 3:
        this.textButton3 = 'Correct'
        this.toggleButton3 = true; 
        break;
      case 4:
        this.textButton4 = 'Correct'
        this.toggleButton4 = true; 
        break;
    }
  }
  initButton() {
    this.textButton1 = 'Incorrect'
    this.textButton2 = 'Incorrect'
    this.textButton3 = 'Incorrect'
    this.textButton4 = 'Incorrect'

    this.toggleButton1 = false;
    this.toggleButton2 = false;
    this.toggleButton3 = false;
    this.toggleButton4 = false;
  }

  setDataAnswer(){

    let listaAnswer = new Array<Answer>();
  
    let flagCorrecto = new Parametro();
    let answer = new  Answer ();
    answer.respuesta = this.answer1;
   
    if(this.toggleButton1) {
      flagCorrecto.codigo = '60'
    }else {
      flagCorrecto.codigo = '70'
    }
    answer.flagCorrecto = flagCorrecto;
    listaAnswer.push(answer);

    flagCorrecto = new Parametro();
    answer = new Answer();
    answer.respuesta = this.answer2;
    if(this.toggleButton2) {
      flagCorrecto.codigo = '60'
    }else {
      flagCorrecto.codigo = '70'
    }
    answer.flagCorrecto = flagCorrecto;
    listaAnswer.push(answer);

    flagCorrecto = new Parametro();
    answer = new Answer();
    answer.respuesta = this.answer3;
    if(this.toggleButton3) {
      flagCorrecto.codigo = '60'
    }else {
      flagCorrecto.codigo = '70'
    }
    answer.flagCorrecto = flagCorrecto;
    listaAnswer.push(answer);


    flagCorrecto = new Parametro();
    answer = new Answer();
    answer.respuesta = this.answer4;
    if(this.toggleButton4) {
      flagCorrecto.codigo = '60'
    }else {
      flagCorrecto.codigo = '70'
    }
    answer.flagCorrecto = flagCorrecto;
    listaAnswer.push(answer);

    console.log(listaAnswer);
    this.clearInputs();
    this.initButton();
    this.childEvent.emit(listaAnswer);
  }
}
