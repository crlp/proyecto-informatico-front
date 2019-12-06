import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { Activity } from 'src/shared/modelo/activity';
import { Topic } from 'src/shared/modelo/topic';
import { Parametro } from 'src/shared/modelo/param';
import { OwnActivitiesByTopicComponent } from 'src/app/modal/activity/own-activities-by-topic/own-activities-by-topic.component';

@Component({
  selector: 'app-modal-activity-rooms',
  templateUrl: './modal-activity-rooms.component.html',
  styleUrls: ['./modal-activity-rooms.component.css']
})
export class ModalActivityRoomsComponent implements OnInit {

  displayedColumns: string[] = ['codigoAleatorio', 'profesor', 'tipoActividad', 'action'];
  dataSource : Activity [] = []
  topic: Topic;
  constructor(@Inject(MAT_DIALOG_DATA) data : any, public dialog: MatDialog) { 
    this.dataSource = data.listaActivity;
    this.topic = data.topic;
  }

  ngOnInit() {
  }

  
  radioChange(event, activityIn: Activity) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {activity: activityIn, topic: this.topic};
      const dialogRef =  this.dialog.open(OwnActivitiesByTopicComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.dialog.closeAll()
      });
  }
}
