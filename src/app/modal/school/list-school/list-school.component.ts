import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { School } from 'src/shared/modelo/school';
import { SchoolService } from 'src/shared/services/school.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-school',
  templateUrl: './list-school.component.html',
  styleUrls: ['./list-school.component.css']
})
export class ListSchoolComponent implements OnInit {

  cabeceras = ['NAME', 'RUC', 'DIRECTION', 'PHONE', 'PRINCIPAL NAME', 'ACTION']
  listaColegios : School[] = []
  constructor( public dialogRef: MatDialogRef<ListSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: School[], private schoolService: SchoolService) { 
      this.listaColegios = data
      console.log(this.listaColegios)
  }

  ngOnInit() {
  }

  close(colegio : School){
    this.dialogRef.close({ data:colegio });
  }

  editColegio(colegio : School){
    this.close(colegio);
  }

  deleteColegio(colegio : School){
    console.log(colegio);
    this.schoolService.deleteColegio(colegio.codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.dialogRef.close()
      }
    });
  }

}
