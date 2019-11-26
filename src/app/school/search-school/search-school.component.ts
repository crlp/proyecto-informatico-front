import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { School } from 'src/modelo/school';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SchoolService } from 'src/services/school.service';
import { HttpResponse } from '@angular/common/http';
import { Metodo } from 'src/app/util/metodo';

@Component({
  selector: 'app-search-school',
  templateUrl: './search-school.component.html',
  styleUrls: ['./search-school.component.css']
})
export class SearchSchoolComponent implements OnInit {

  schoolSelected   : School         = null;
  listaSchoolArray : Array<School>  = [];
  myControl       : FormControl   = new FormControl();
  filteredOptions : Observable< Array< School > >;

  @Output() 
  childEvent =  new EventEmitter
  
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.listaColegios();
  }

  selectedSchool(event) {
    this.schoolSelected = event.option.value;
    this.confirmarSchool ();
  }

  getOptionText(option : any) {
    if(option != null) {
      return option.nombre
    }else {
      return '';
    }
  }

  listaColegios(){
    this.schoolService.listaColegios().subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.filteredOptions= Metodo.JSON_TO_OBJECT_PAGEABLE( datos.body );
      }
    })
  }

  confirmarSchool (){
    this.childEvent.emit(this.schoolSelected);
  }
}
