import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Activity } from 'src/modelo/activity';
import { Router } from '@angular/router';
import { ActivityService } from 'src/services/activity.service';
import { HttpResponse } from '@angular/common/http';
import { Parametro } from 'src/modelo/param';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Metodo } from 'src/app/util/metodo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listaActivities       : Activity[]  = [];
  listaActivityPend     : Activity[]  = [];
  listaActivityCancel   : Activity[]  = [];
  listaActivityFinished : Activity[]  = [];
  listaEstado           : Parametro[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.listadoParametros(ParametroUtil.LST_ESTADO_ACTIVIDAD);
    this.listActivities();
  }

  listActivities() {
        this.activityService.listActivies().subscribe(datos =>{
          if (datos instanceof HttpResponse) {
            this.listaActivities=JSON.parse(JSON.stringify(datos.body));
            this.activityByStatus();        
          }

      })
  }
  
  activityByStatus() {
    this.listaActivities.forEach(activity => {
      this.listaEstado.forEach(estado => {
        if( activity.estado.codigo == estado.codigo){
          switch(estado.valor){
            case ParametroUtil.STATUS_PEND:
              this.listaActivityPend.push(activity);
              break;
            case ParametroUtil.STATUS_FINI:
              this.listaActivityFinished.push(activity);
              break;
            case ParametroUtil.STATUS_CANC:
              this.listaActivityCancel.push(activity);
              break; 
          }
        }
      });
    });
  }

  listadoParametros(codigo : string){
    this.activityService.listarParametros(codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.listaEstado = Metodo.JSON_TO_OBJECT(datos.body);
      }
    })
  }
}
