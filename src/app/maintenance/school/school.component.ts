import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Metodo } from 'src/app/util/metodo';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ListSchoolComponent } from 'src/app/modal/school/list-school/list-school.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { School } from 'src/modelo/school';
import { SchoolService } from 'src/services/school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent {

  _listaColegios: School[] = []
  _colegioSelected: School = new School();

  constructor(private _colegioService: SchoolService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  listarColegios() {
    this._colegioService.listaColegios().subscribe(datos => {
      if (datos instanceof HttpResponse) {
        this._listaColegios = Metodo.JSON_TO_OBJECT_PAGEABLE(datos.body);
        this.mostrarLista()
      }
    })
  }

  grabarColegio() {

    if (this.validarCampos()) {
      this.spinner.show();
      this._colegioService.registrarColegio(this._colegioSelected).subscribe(datos => {
        if (datos instanceof HttpResponse) {
          Metodo.DIALOG_MESSAGE_SUCCESS("School inserted correctly!")
          this.limpiarTexto();
        } else {
          Metodo.DIALOG_MESSAGE_ERROR("Possible error!")
        }
        this.spinner.hide();
      })
    } else {
      Metodo.DIALOG_MESSAGE_ERROR("Incomplete fields!")
    }
  }

  validarCampos(): boolean {

    if (!this._colegioSelected.nombre || !this._colegioSelected.ruc ||
      !this._colegioSelected.telefono || !this._colegioSelected.director ||
      !this._colegioSelected.direccion) {
      return false
    }
    return true
  }

  limpiarTexto() {
    this._colegioSelected = new School();
  }

  mostrarLista() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = this._listaColegios
    const dialogRef = this.dialog.open(ListSchoolComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        this.limpiarTexto();
        this._colegioSelected = result.data
      }
    });
  }

}
