import { HttpHeaders } from '@angular/common/http';
import { ParametroUtil } from './parametroUtil';

export class Metodo {

    static AUTHORIZATION = "Authorization";
    static CONTENT_TYPE = "Content-Type";
    static TYPE = "application/x-www-form-urlencoded"
    static TYPEJSON = "application/json; charset=utf8"
    static BASIC_AUTHENTITACION = "Basic "

    public static getHeadersInvocation() : HttpHeaders{
        
        let paramBasic = this.BASIC_AUTHENTITACION +  localStorage.getItem(ParametroUtil.BASIC_AUTHENTICATION);
        let headers = new HttpHeaders();
        headers = headers.append(this.AUTHORIZATION, paramBasic);
        headers = headers.append(this.CONTENT_TYPE, this.TYPE);
    
        return headers;
    }

    public static getHeadersSimple() : HttpHeaders{
        
        let paramBasic = this.BASIC_AUTHENTITACION +  localStorage.getItem(ParametroUtil.BASIC_AUTHENTICATION);
        let headers = new HttpHeaders();
        headers = headers.append(this.AUTHORIZATION, paramBasic);
    
        return headers;
    }


    public static getHeadersInvocationPost() : HttpHeaders{
        
        let paramBasic = this.BASIC_AUTHENTITACION +  localStorage.getItem(ParametroUtil.BASIC_AUTHENTICATION);
        let headers = new HttpHeaders();
        headers = headers.append(this.AUTHORIZATION, paramBasic);
        headers = headers.append(this.CONTENT_TYPE, this.TYPEJSON);
    
        return headers;
    }


}
