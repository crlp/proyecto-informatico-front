import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/modelo/usuario';
import { ActivityService } from 'src/services/activity.service';
import { HttpResponse } from '@angular/common/http';
import { Activity } from 'src/modelo/activity';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivityRealService } from 'src/services/activity-real.service';
import { ActivityReal } from 'src/modelo/firebase/activity-real';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Router } from '@angular/router';
import { Question } from 'src/modelo/question';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

  usuario        : Usuario    = null;
  listActivities : Activity[] = [];

  preguntaPosicion  = 0;
  cantidadLeidos    = 0;

  constructor(private _activityService : ActivityService, 
    private _activityRealService : ActivityRealService, 
    private router: Router) {
    this.usuario = JSON.parse(localStorage.getItem(ParametroUtil.USER_STORAGE));
  }

  ngOnInit() {
    this.getActiviest ();
  }

  getActiviest () {
    this._activityService.listaActivitiesPropiasEstudiante(this.usuario.aula.codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.listActivities = JSON.parse(JSON.stringify(datos.body));
      }
    })
  }

  playActivity(activity : Activity) {
    this._activityRealService.registrarParticipacion(this.usuario, activity);
    this.router.navigate (['/student-active'], {queryParams:{ codigo : activity.codigoAleatorio} });
  }

}
