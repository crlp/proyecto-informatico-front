import { Component, OnInit,  Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material';
import { ActivityService } from 'src/services/activity/activity.service';
import { Activity } from 'src/modelo/activity';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';


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
        console.log(datos.body);
        this.spinner.hide();
      }else {        
        this.spinner.hide();
      }
    })
  }
}
