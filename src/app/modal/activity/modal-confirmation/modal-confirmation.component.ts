import { Component, OnInit,  Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material';
import { ActivityService } from 'src/shared/services/activity.service';
import { Activity } from 'src/shared/modelo/activity';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Metodo } from 'src/app/util/metodo';


@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  activity  : Activity;

  constructor(private  dialogRef:  MatDialogRef<ModalConfirmationComponent>,
     @Inject(MAT_DIALOG_DATA) data, private activityService : ActivityService, private spinner : NgxSpinnerService) {
       this.activity =  data;
  }
  
  close() {
      this.dialogRef.close();
  }

  ngOnInit() {
  }
  
  saveActivity(){
    console.log("Actividad a enviar = >" + JSON.stringify(this.activity));
    this.dialogRef.close();
    this.spinner.show();
    this.activityService.registrarActividad(this.activity).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        Metodo.DIALOG_MESSAGE_SUCCESS("Your activity will appear in your classes!")
      }else {
        Metodo.DIALOG_MESSAGE_ERROR("Possible error!")
      }
      this.spinner.hide();
    })
  }
}
