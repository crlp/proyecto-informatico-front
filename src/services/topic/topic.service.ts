import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParametroUtil } from 'src/app/util/parametroUtil';

@Injectable()
export class TopicService {

  constructor(private http: HttpClient) { }

  listaTemas(): Observable<HttpEvent<{}>> {
    let url  = ParametroUtil.URL_BASE +  "/topic";
    const req = new HttpRequest(ParametroUtil.GET, url , ParametroUtil.INIT);
    return this.http.request(req);
  }
}
