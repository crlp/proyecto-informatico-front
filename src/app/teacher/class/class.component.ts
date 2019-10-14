import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OwnActivitiesByTopicComponent } from '../../modal/activity/own-activities-by-topic/own-activities-by-topic.component';
import { Topic } from 'src/modelo/topic';
import { ActivityService } from 'src/services/activity.service';
import { HttpResponse } from '@angular/common/http';
import { Activity } from 'src/modelo/activity';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent{
  
  topic            : Topic      = null ;
  activitySelected : Activity   = null;

  activities       : Activity[] = [] ;

  constructor(public dialog: MatDialog,private activityService : ActivityService, private spinner : NgxSpinnerService) { }

  showOwnActivities(activity : Activity){
    this.activitySelected = activity;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { topic : this.topic, activity : this.activitySelected }
    const dialogRef =  this.dialog.open(OwnActivitiesByTopicComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  recepcionTema (topic : Topic){
    this.topic = topic;
    this.getActivitiesByUser();
  }

  getActivitiesByUser(){
    this.activityService.listaActivitiesPropias(this.topic.codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        console.log(datos.body);
        this.activities = JSON.parse(JSON.stringify(datos.body));
      }
      this.spinner.hide();
    })
  }

}
