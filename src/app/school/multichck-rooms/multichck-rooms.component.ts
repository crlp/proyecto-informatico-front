import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Parametro } from 'src/shared/modelo/param';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/shared/services/usuario.service';
import { HttpResponse } from '@angular/common/http';
import { Metodo } from 'src/app/util/metodo';

@Component({
  selector: 'app-multichck-rooms',
  templateUrl: './multichck-rooms.component.html',
  styleUrls: ['./multichck-rooms.component.css']
})
export class MultichckRoomsComponent  {

  allSalones : Array<Parametro>

  @Output() 
  childEvent =  new EventEmitter
  
  
  constructor(private usuarioService : UsuarioService){
    this.getAllClassroom();
  }

  getAllClassroom(){
    this.usuarioService.listarParametros("LST_AULAS").subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.allSalones = Metodo.JSON_TO_OBJECT( datos.body );
      }
    })
  }
  marcarSalones(filteredOptionsSalones : Array< Parametro >){
    let salonesSelected = filteredOptionsSalones;
    this.allSalones.forEach(element => {
      element.selected = false;
      salonesSelected.forEach(elementFilter => {
        if(elementFilter.codigo == element.codigo){
            element.selected = true;
        }
      });
    });
  }

  finalSalon(){
    let salonesFinales = new Array<Parametro>();
    this.allSalones.forEach(element => {
      if(element.selected){
        salonesFinales.push(element)
      }
    });
    this.childEvent.emit(salonesFinales);
  }

}
