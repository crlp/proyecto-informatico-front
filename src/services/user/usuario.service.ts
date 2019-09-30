import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/modelo/usuario';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Metodo } from 'src/app/util/metodo';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasena:string): Observable<HttpEvent<{}>> {
    localStorage.setItem('basic', btoa(usuario + ":" + contrasena));
    let formdata: FormData = new FormData();    
    let url = ParametroUtil.URL_BASE + '/user/login/' + usuario;
    const req = new HttpRequest(ParametroUtil.POST, url, formdata, {
      headers : Metodo.getHeadersInvocation(),
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  listarUsuarios(): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE +'/user/'+ localStorage.getItem(ParametroUtil.CODE_USER_STORAGE);
    const req = new HttpRequest(ParametroUtil.GET, url, ParametroUtil.INIT);
    return this.http.request(req);
  }

  listarParametros(codigo): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE +'/values/'+codigo
    const req = new HttpRequest(ParametroUtil.GET,  url, ParametroUtil.INIT);
    return this.http.request(req);
  }

  actualizarUsuario(usuario: Usuario): Observable<HttpEvent<{}>> {  
    let url = ParametroUtil.URL_BASE + '/user'
    const req = new HttpRequest(ParametroUtil.PUT,  url, usuario, {
      headers : Metodo.getHeadersInvocationPost(),
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  onUpload(files: File,codigo) {
    const formData = new FormData();
    formData.append("file", files, files.name);
    let url = ParametroUtil.URL_BASE + '/user/'+codigo+'/photo'
    const req = new HttpRequest(ParametroUtil.POST, url, formData, {
      headers : Metodo.getHeadersSimple(),
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

    

}
