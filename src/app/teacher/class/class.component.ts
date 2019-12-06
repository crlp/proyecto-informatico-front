import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Topic } from 'src/shared/modelo/topic';
import { ActivityService } from 'src/shared/services/activity.service';
import { HttpResponse } from '@angular/common/http';
import { Activity } from 'src/shared/modelo/activity';
import { NgxSpinnerService } from 'ngx-spinner';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SectionClass } from 'src/shared/modelo/section-class';
import { DetailSectionClassComponent } from './detail-section-class/detail-section-class.component';
import { Usuario } from 'src/shared/modelo/usuario';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { TopicService } from 'src/shared/services/topic.service';
import { Metodo } from 'src/app/util/metodo';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit{

  topic            : Topic      = new Topic() ;
  activitySelected : Activity   = null;
  activities       : Activity[] = [] ;
  usuario          : Usuario

  sectionClass = new SectionClass();
  listSectionClass : SectionClass[] = [] ;

  editor = ClassicEditor;

  constructor(public dialog: MatDialog,private topicService: TopicService, private activityService : ActivityService, private spinner : NgxSpinnerService) { 
    this.usuario  = JSON.parse(localStorage.getItem(ParametroUtil.USER_STORAGE));
  }

  ngOnInit(): void { }

  crearTema() {
    this.topic.colegio = this.usuario.colegio;
    this.topic.listaTemaSeccion = this.listSectionClass;
    this.topicService.insertaTema(this.topic).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.topic = new Topic();
        Metodo.DIALOG_MESSAGE_SUCCESS('Topic inserted!!!')
      }
    })
  }

  verHtml(sectionClass: SectionClass){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = sectionClass;
    const dialogRef =  this.dialog.open(DetailSectionClassComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

    });
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
  
  addSectionInMemory(){
    this.listSectionClass.push(this.sectionClass);
    this.sectionClass = new SectionClass();
  }

}
