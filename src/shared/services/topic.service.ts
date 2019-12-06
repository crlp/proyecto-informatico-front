import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Metodo } from 'src/app/util/metodo';
import { Topic } from 'src/shared/modelo/topic';

@Injectable()
export class TopicService {

  constructor(private http: HttpClient) { }

  listaTemas(codigoColegio: string): Observable<HttpEvent<{}>> {
    let url  = ParametroUtil.URL_BASE +  "/topic/school/" + codigoColegio;
    const req = new HttpRequest(ParametroUtil.GET, url , Metodo.INIT);
    return this.http.request(req);
  }

  listaTema(codigoTema: string): Observable<HttpEvent<{}>> {
    let url  = ParametroUtil.URL_BASE +  "/topic/"+ codigoTema+ "/section";
    const req = new HttpRequest(ParametroUtil.GET, url , Metodo.INIT);
    return this.http.request(req);
  }

  insertaTema(tema: Topic){
    let body = JSON.stringify(tema);
    let url = ParametroUtil.URL_BASE + '/topic';
    const req = new HttpRequest(ParametroUtil.POST, url, body, {
      headers : Metodo.getHeadersInvocationPost(),
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

}
