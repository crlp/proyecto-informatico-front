import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/shared/modelo/usuario';
import { SchoolService } from 'src/shared/services/school.service';
import { HttpResponse } from '@angular/common/http';
import { School } from 'src/shared/modelo/school';
import { Metodo } from 'src/app/util/metodo';
import { Parametro } from 'src/shared/modelo/param';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


export interface PeriodicElement {
  names: string;
  user: string;
  phone: string;
}

@Component({
  selector: 'app-modal-see-users',
  templateUrl: './modal-see-users.component.html',
  styleUrls: ['./modal-see-users.component.css']
})
export class ModalSeeUsersComponent implements OnInit {

  _schoolSelected : School = null
  _sectionGradeSelected: Parametro
  dataSource : Usuario[] = []
  displayedColumns: string[] = ['names', 'user', 'phone'];

  selected : string;
  constructor(private schoolService: SchoolService, private  dialogRef:  MatDialogRef<ModalSeeUsersComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }

  
  recepcionSchool(school : School){
    this._schoolSelected = school;
  }

  onChange() {
    console.log('Entreeee' + this.selected);
  }
  
  recepcionRooms (gradeSection : Parametro){
    this._sectionGradeSelected = gradeSection;
  }

  close(){
    this.dialogRef.close();
  }
  obtenerUsuario(){
    let codigoPerfil = ''
    let codigoaula = '0'
    if( this.selected === 'teacher') {
      codigoPerfil = '5';
    }else if( this.selected === 'student') {
      codigoPerfil = '4';
      codigoaula = this._sectionGradeSelected.codigo;
    }
    this.schoolService.listUsuarioPorColegioYPerfil(codigoPerfil, this._schoolSelected.codigo, codigoaula).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.dataSource = Metodo.JSON_TO_OBJECT(datos.body);
      }
    })
  }

}
