import { Component, Input } from '@angular/core';
import { Activity } from 'src/shared/modelo/activity';
import { Question } from 'src/shared/modelo/question';
import { MatDialog } from '@angular/material';
import { ModalActivityDetailComponent } from '../../../modal/activity/modal-activity-detail/modal-activity-detail.component';

@Component({
  selector: 'app-question-of-topic',
  templateUrl: './question-of-topic.component.html',
  styleUrls: ['./question-of-topic.component.css']
})
export class QuestionOfTopicComponent{

  listaPreguntaOutAux: Question[] = [];

  @Input() 
  listaPreguntaOut : Array<Question> ;

  constructor(public dialog: MatDialog) {
  }

  seeDetail(question : Question): void {
    const dialogRef = this.dialog.open(ModalActivityDetailComponent, {
      width: '400px',
      data: question
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  deleteQuestion(question : Question){

    this.listaPreguntaOutAux = new Array<Question>();

    this.listaPreguntaOut.forEach(out => {
      if(out.pregunta != question.pregunta) {
        this.listaPreguntaOutAux.push(out);
      }
    });
       
    this.listaPreguntaOut =  this.listaPreguntaOutAux;
   }
}
