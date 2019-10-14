import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/modelo/usuario';
import { ActivityRealService } from 'src/services/activity-real.service';
import { ActivityReal } from 'src/modelo/firebase/activity-real';
import { Participant } from 'src/modelo/firebase/participant';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivityService } from 'src/services/activity.service';
import { HttpResponse } from '@angular/common/http';
import { Question } from 'src/modelo/question';
import { Metodo } from 'src/app/util/metodo';
@Component({
  selector: 'app-participants-active',
  templateUrl: './participants-active.component.html',
  styleUrls: ['./participants-active.component.css']
})
export class ParticipantsActiveComponent implements OnInit {

  activityReal    : ActivityReal = null;
  listaPreguntas  : Question[] = [];
  listParticipant : Usuario[]  = [];

  codigoActividad = '';
  order = '';
  
  constructor(private activityRealService : ActivityRealService,private router: Router,private route: ActivatedRoute, private activityService : ActivityService ) {
    this.activityReal = new ActivityReal();
  }
  
  ngOnInit() {
    this.order = this.route.snapshot.queryParamMap.get("codigoAleatorio");
    this.codigoActividad = this.route.snapshot.queryParamMap.get("codigo");

    this.activityReal.codigoActividad = this.order;

    this.activityRealService.getActivitiesRealFire(this.order)
      .snapshotChanges().subscribe(item => {
      
      this.listParticipant = [];
      item.forEach(element => {
        var x = element.payload.toJSON()
        x["$key"] = element.key;
        this.listParticipant.push(x as Usuario);
      });
    });
  }

  comenzarJuego () {
    this.activityReal.codigo = this.codigoActividad;
    this.activityReal.listaParticipante = this.listParticipant;
    this.activityService.registrarParticipantes(this.activityReal).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.listaPreguntas = Metodo.JSON_TO_OBJECT(datos.body);
        this.activityRealService.registrarPreguntas(this.order , this.listaPreguntas)
        this.router.navigate (['/teacher-active'], {queryParams:{codigo : this.order  } });
      }
    })
  }

}
