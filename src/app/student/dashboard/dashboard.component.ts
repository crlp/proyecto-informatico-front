import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Activity } from 'src/modelo/activity';
import { Router } from '@angular/router';
import { ActivityService } from 'src/services/activity/activity.service';
import { HttpResponse } from '@angular/common/http';
import { Parametro } from 'src/modelo/param';
import { ParametroUtil } from 'src/app/util/parametroUtil';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listaActivities: Array<Activity> = [];
  listaActivityPend: Array<Activity> = [];
  listaActivityCancel: Array<Activity> = [];
  listaActivityFinished: Array<Activity> = [];
  listaEstado: Parametro[]=[];

  constructor(private router: Router,private activityService: ActivityService) { }

  ngOnInit() {
    this.listadoParametros(ParametroUtil.LST_ESTADO_ACTIVIDAD);
    this.listActivities();
  }

  listActivities() {
        this.activityService.listActivies().subscribe(datos =>{
          if (datos instanceof HttpResponse) {
            console.log(datos.body);
            this.listaActivities=JSON.parse(JSON.stringify(datos.body));
            console.log(this.listaActivities);    
            this.activityByStatus();        
          }

      })
  }
  
  activityByStatus() {
    this.listaActivities.forEach(activity => {
      this.listaEstado.forEach(estado => {
        if(activity.estado.codigo == estado.codigo){
          if(estado.valor == "PENDIENTE"){
            this.listaActivityPend.push(activity);
          }else  if(estado.valor == "FINALIZADO"){
            this.listaActivityFinished.push(activity);
          }else  if(estado.valor == "CANCELADO"){
            this.listaActivityCancel.push(activity);
          }
        }
      });
    });
  }

  listadoParametros(codigo){

    this.activityService.listarParametros(codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        console.log(datos.body);
        this.listaEstado =JSON.parse(JSON.stringify(datos.body));
        console.log(this.listaEstado)
      }
    })
  }
}
