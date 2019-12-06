import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/shared/modelo/topic';
import { SectionClass } from 'src/shared/modelo/section-class';
import { TopicService } from 'src/shared/services/topic.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DetailSectionClassComponent } from 'src/app/teacher/class/detail-section-class/detail-section-class.component';
import { ActivityService } from 'src/shared/services/activity.service';
import { Activity } from 'src/shared/modelo/activity';
import { ModalActivityRoomsComponent } from '../modal-activity-rooms/modal-activity-rooms.component';

@Component({
  selector: 'app-make-class',
  templateUrl: './make-class.component.html',
  styleUrls: ['./make-class.component.css']
})
export class MakeClassComponent implements OnInit {

  tema : Topic = new Topic();
  listaSeccion : SectionClass[] = []
  listaActivity : Activity[] = []

  constructor(private topicService: TopicService, public dialog: MatDialog,
    private activityService: ActivityService) { }

  ngOnInit() {
  }

  recepcionTema ( topic : Topic){
    this.tema = topic;
    this.topicService.listaTema(this.tema.codisgo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.listaSeccion = JSON.parse(JSON.stringify(datos.body));
        console.log(this.listaSeccion);
      }
    })
    this.existeActividadPorTema();
  }

  verHtml(sectionClass: SectionClass){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = sectionClass;
    dialogConfig.width =  '500px';
    const dialogRef =  this.dialog.open(DetailSectionClassComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  existeActividadPorTema() {
    this.activityService.listaActividadesByTema(this.tema.codisgo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.listaActivity = JSON.parse(JSON.stringify(datos.body));
        console.log(this.listaActivity);
      }
    })
  }

  comenzarJuegoTiempoReal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { topic: this.tema, listaActivity: this.listaActivity }
    const dialogRef =  this.dialog.open(ModalActivityRoomsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll()
    });
  }

}
