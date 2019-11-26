import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatRadioChange, MatRadioButton } from '@angular/material';

@Component({
  selector: 'app-rbt-student-teacher',
  templateUrl: './rbt-student-teacher.component.html',
  styleUrls: ['./rbt-student-teacher.component.css']
})
export class RbtStudentTeacherComponent{

  //Donde optionSelected = 0 es igual a alumno
  //Donde optionSelected = 1 es igual a profesor
  _optionSelected : string
  optionsRbt = ['Student', 'Teacher', 'Classrooms']

  @Output() 
  childEvent =  new EventEmitter
  
  constructor() { }

  onChange(mrChange: MatRadioChange) {
   this._optionSelected = mrChange.value;
   let positionSelected = this.optionsRbt.findIndex(optionsRbt => optionsRbt ===  this._optionSelected )
   this.childEvent.emit(positionSelected);
  }

}
