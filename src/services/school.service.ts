import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Metodo } from 'src/app/util/metodo';
import { School } from 'src/modelo/school';
import { TeacherClassrooms } from 'src/modelo/teacher-classrooms';

@Injectable()
export class SchoolService {

  constructor(private http: HttpClient) { }

  listaColegios(): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE +'/school'
    const req = new HttpRequest(ParametroUtil.GET, url, Metodo.INIT);
    return this.http.request(req);
  }
  
  onUpload(files: File, codigo : string) {
    const formData = new FormData();
    formData.append("file", files, files.name);
    let url = ParametroUtil.URL_BASE + '/school/'+codigo+'/photo'
    const req = new HttpRequest(ParametroUtil.POST, url, formData, {
      headers : Metodo.getHeadersSimple(),
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  registrarColegio(colegio: School) {

    let url = ParametroUtil.URL_BASE + '/school';
    const req = new HttpRequest(ParametroUtil.POST, url, JSON.stringify(colegio), {
      headers : Metodo.getHeadersInvocationPost(),
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteColegio(colegioId: string, ): Observable<HttpEvent<{}>> {  
    let url = ParametroUtil.URL_BASE + '/school/' + colegioId
    const req = new HttpRequest(ParametroUtil.DELETE,  url, {
      headers : Metodo.getHeadersSimple(),
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  listaProfesorPorColegio(codigoColegio : string): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE +'/users/school/' + codigoColegio + '/teachers'
    const req = new HttpRequest(ParametroUtil.GET, url, Metodo.INIT);
    return this.http.request(req);
  }
  
  listaSalonesPorProfesor(codigoProfesor : string): Observable<HttpEvent<{}>> {
    let url = ParametroUtil.URL_BASE +'/users/school/teacher/' + codigoProfesor + '/classrooms'
    const req = new HttpRequest(ParametroUtil.GET, url, Metodo.INIT);
    return this.http.request(req);
  }


  registraSalones(codigoProfesor : string, listTeacherClassrooms: Array<TeacherClassrooms>) {

    let url = ParametroUtil.URL_BASE + '/users/school/teacher/'+ codigoProfesor + '/classrooms';
    const req = new HttpRequest(ParametroUtil.POST, url, JSON.stringify(listTeacherClassrooms), {
      headers : Metodo.getHeadersInvocationPost(),
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }
  
    

}
