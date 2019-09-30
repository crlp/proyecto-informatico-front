import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/modelo/usuario';
import { ActivityService } from 'src/services/activity/activity.service';
import { HttpResponse } from '@angular/common/http';
import { Activity } from 'src/modelo/activity';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivityRealService } from 'src/services/firebase/activity-real.service';
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

  usuario     : Usuario;
  listActivities : Activity[];

  preguntaPosicion = 0;
  cantidadLeidos = 0;

  constructor(private activityService : ActivityService, private spinner : NgxSpinnerService,
  private activityRealService : ActivityRealService, private router: Router) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem(ParametroUtil.USER_STORAGE));
    this.getActiviest ();

  }

  getActiviest () {
    this.activityService.listaActivitiesPropiasEstudiante(this.usuario.aula.codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        console.log(datos.body);
        this.listActivities = JSON.parse(JSON.stringify(datos.body));
      }
    })
  }

  playActivity(activity : Activity) {
    this.activityRealService.registrarParticipacion(this.usuario, activity);
    this.router.navigate (['/student-active'], {queryParams:{ codigo : activity.codigoAleatorio} });
  }

}
