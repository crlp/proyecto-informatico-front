import { HttpHeaders } from '@angular/common/http';
import { ParametroUtil } from './parametroUtil';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

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

    public static INIT  =  {
        headers : Metodo.getHeadersInvocation(),
        reportProgress: true,
        responseType: 'json',
    }

    public static DIALOG_MESSAGE_SUCCESS(message : string){
        swal.fire(
            'Good Job!',
            message,
            'success'
          )
    }
    

    public static DIALOG_MESSAGE_ERROR(message : string){
        swal.fire(
            'Possible problems!',
            message,
            'error'
        )
    }
    public static JSON_TO_OBJECT(message : any) : any{
        return JSON.parse( JSON.stringify( message ) );
    }

}
