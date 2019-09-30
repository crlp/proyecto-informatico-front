import { Component, EventEmitter, Output} from '@angular/core';
import { Answer } from 'src/modelo/answer';
import { Parametro } from 'src/modelo/param';


@Component({
  selector: 'app-answer-of-question-teacher',
  templateUrl: './answer-of-question-teacher.component.html',
  styleUrls: ['./answer-of-question-teacher.component.css']
})

export class AnswerOfQuestionTeacherComponent{

  listaAnswer   : Answer[];
  flagCorrecto  : Parametro;
  answer    : Answer;
  answer1   : string;
  answer2   : string;
  answer3   : string;
  answer4   : string;

  @Output() public childEvent =  new EventEmitter
  
  constructor() { }
 
  clearInputs(){
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
  }

  confirmarPreguntas(){
    this.listaAnswer = new Array<Answer>();

    this.answer = new Answer();
    this.answer.respuesta = this.answer1;
    this.flagCorrecto = new Parametro();
    this.flagCorrecto.codigo = '69'
    this.answer.flagCorrecto = this.flagCorrecto;
    this.listaAnswer.push(this.answer);

    this.answer = new Answer();
    this.answer.respuesta = this.answer2;
    this.flagCorrecto = new Parametro();
    this.flagCorrecto.codigo = '70'
    this.answer.flagCorrecto = this.flagCorrecto;
    this.listaAnswer.push(this.answer);

    this.answer = new Answer();
    this.answer.respuesta = this.answer3;
    this.flagCorrecto = new Parametro();
    this.flagCorrecto.codigo = '70'
    this.answer.flagCorrecto = this.flagCorrecto;
    this.listaAnswer.push(this.answer);

    this.answer = new Answer();
    this.answer.respuesta = this.answer4;
    this.flagCorrecto = new Parametro();
    this.flagCorrecto.codigo = '70'
    this.answer.flagCorrecto = this.flagCorrecto;
    this.listaAnswer.push(this.answer);

    this.clearInputs();
    this.childEvent.emit(this.listaAnswer);
  }
}
