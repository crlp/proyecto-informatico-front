import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material';
import { Topic } from 'src/modelo/topic';
import { Usuario } from 'src/modelo/usuario';
import { ActivityService } from 'src/services/activity/activity.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpResponse } from '@angular/common/http';
import { Activity } from 'src/modelo/activity';
import { Router, NavigationExtras } from '@angular/router';
import { ActivityRealService } from 'src/services/firebase/activity-real.service';
import { ActivityReal } from 'src/modelo/firebase/activity-real';
import { Parametro } from 'src/modelo/param';
import { UsuarioService } from 'src/services/user/usuario.service';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-own-activities-by-topic',
  templateUrl: './own-activities-by-topic.component.html',
  styleUrls: ['./own-activities-by-topic.component.css']
})
export class OwnActivitiesByTopicComponent implements OnInit {

  topic       : Topic;
  usuario     : Usuario;
  activityReal: ActivityReal;
  myControl   : FormControl = new FormControl();
  activitySelected : Activity;

  listaAulas    : Parametro[]=[];
  aulaSelected  : Parametro;

  
  constructor(private  dialogRef:  MatDialogRef<OwnActivitiesByTopicComponent>, 
    private activityRealService : ActivityRealService, @Inject(MAT_DIALOG_DATA) data : any, 
    private spinner : NgxSpinnerService, private router: Router, private usuarioService: UsuarioService,
    private activityService : ActivityService ) { 

      this.topic = data.topic;
      this.activitySelected = data.activity;
      
  }

  ngOnInit() {
    this.spinner.show();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.listadoParametros(ParametroUtil.LST_AULAS);
  }

  close() {
    this.dialogRef.close();
  }
  insertarAsociacion() {

    this.dialogRef.close();
    //creando firebase
    this.activityReal = new ActivityReal();
    this.activityReal.codigoActividad = this.activitySelected.codigoAleatorio;

    this.activityService.registrarAsociacionActividad(this.activitySelected.codigo, this.aulaSelected.codigo, this.usuario.codigo ).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        console.log(datos.body);
        var body = JSON.parse(JSON.stringify(datos.body));
        console.log("respuesta "  + body)
        
        //enviando a firebase
        this.activityRealService.insertarActivacionCodigoActividad(this.activityReal);
        this.router.navigate (['/participants'], {queryParams:{codigo: this.activitySelected.codigo , codigoAleatorio : this.activitySelected.codigoAleatorio}});
        this.spinner.hide();
      }else {        
        this.spinner.hide();
      }
    })
  }

  listadoParametros(codigo){

    this.usuarioService.listarParametros(codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        console.log(datos.body);
        this.listaAulas =JSON.parse(JSON.stringify(datos.body));
        
      }
      this.spinner.hide();
    })
  }

  getOptionText(option) {
    if(option != null) {
      return option.descripcion;
    }else {
      return '';
    }
  }

  selectedSalon(event) {
    this.aulaSelected = event.option.value;
  }

}
