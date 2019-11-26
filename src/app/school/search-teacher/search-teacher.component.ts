import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Usuario } from 'src/modelo/usuario';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchoolService } from 'src/services/school.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {


  teacherSelected   : Usuario         = null;
  listaTeacherArray : Array<Usuario>  = [];
  myControl       : FormControl   = new FormControl();
  
  @Input()
  filteredOptions : Observable< Array< Usuario > >;

  @Output() 
  childEvent =  new EventEmitter
  
  constructor() { }

  ngOnInit() {
  }

  selectedTeacher(event) {
    this.teacherSelected = event.option.value;
    this.confirmarTeacher ();
  }

  getOptionText(option : any) {
    if(option != null) {
      return option.nombres
    }else {
      return '';
    }
  }

  confirmarTeacher (){
    this.childEvent.emit(this.teacherSelected.codigo);
  }

}
