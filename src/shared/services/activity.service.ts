import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from 'src/shared/modelo/activity';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Metodo } from 'src/app/util/metodo';
import { ActivityReal } from 'src/shared/modelo/firebase/activity-real';

@Injectable()
export class ActivityService {

  constructor(private http: HttpClient) { }

  listActivies(): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE + '/user/' + localStorage.getItem(ParametroUtil.CODE_USER_STORAGE) + "/activity";
    const req = new HttpRequest(ParametroUtil.GET, url, Metodo.INIT);
    return this.http.request(req);
  }

  listaActivitiesPropias(codigoTema): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE + '/user/' + localStorage.getItem("codigo") +"/activity/topic/" + codigoTema
    const req = new HttpRequest(ParametroUtil.GET, url ,Metodo.INIT);
    return this.http.request(req);
  }


  listaActividadesByTema(codigoTema): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE + '/activity/topic/' + codigoTema;
    const req = new HttpRequest(ParametroUtil.GET, url ,Metodo.INIT);
    return this.http.request(req);
  }

  
  listaActivitiesPropiasEstudiante(codigoAula): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE + "/activity/room/" + codigoAula
    const req = new HttpRequest(ParametroUtil.GET, url ,Metodo.INIT);
    return this.http.request(req);
  }

  listarParametros(codigo): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE +'/values/'+codigo;
    const req = new HttpRequest(ParametroUtil.GET,  url, Metodo.INIT);
    return this.http.request(req);
  }

  registrarActividad(activity: Activity) {

    let url = ParametroUtil.URL_BASE + '/activity';
    const req = new HttpRequest(ParametroUtil.POST, url, JSON.stringify(activity), {
      headers : Metodo.getHeadersInvocationPost(),
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  registrarAsociacionActividad(codigoActividad: string, codigoAula : string, codigoUsuario: string) {

    let url = ParametroUtil.URL_BASE + '/activity';
    const req = new HttpRequest(ParametroUtil.PUT, url, JSON.stringify({actividad:codigoActividad, salon : codigoAula, usuario: codigoUsuario}), {
      headers : Metodo.getHeadersInvocationPost(),
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }
  


  registrarParticipantes( activityReal : ActivityReal) {

    let url = ParametroUtil.URL_BASE + '/activity/participants';
    const req = new HttpRequest(ParametroUtil.POST, url, JSON.stringify(activityReal), {
      headers : Metodo.getHeadersInvocationPost(),
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

}
