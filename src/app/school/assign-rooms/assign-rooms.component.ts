import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Parametro } from 'src/modelo/param';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/services/usuario.service';
import { HttpResponse } from '@angular/common/http';
import { Metodo } from 'src/app/util/metodo';
import { ParametroUtil } from 'src/app/util/parametroUtil';

@Component({
  selector: 'app-assign-rooms',
  templateUrl: './assign-rooms.component.html',
  styleUrls: ['./assign-rooms.component.css']
})
export class AssignRoomsComponent implements OnInit {

  gradeSectionSelected   : Parametro         = null;
  listaGradeSectionArray : Array<Parametro>  = [];
  myControl       : FormControl   = new FormControl();
  filteredOptions : Observable< Array< Parametro > >;

  @Output() 
  childEvent =  new EventEmitter
  
  constructor(private _parametroService : UsuarioService) { }

  ngOnInit() {
    this.listaGradeSection();
  }

  selectedGradeSection(event) {
    this.gradeSectionSelected = event.option.value;
    this.confirmarSchool ();
  }

  getOptionText(option : any) {
    if(option != null) {
      return option.descripcion
    }else {
      return '';
    }
  }

  listaGradeSection(){
    this._parametroService.listarParametros(ParametroUtil.LST_AULAS).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.filteredOptions= Metodo.JSON_TO_OBJECT( datos.body );
      }
    })
  }

  confirmarSchool (){
    this.childEvent.emit(this.gradeSectionSelected);
  }

}
