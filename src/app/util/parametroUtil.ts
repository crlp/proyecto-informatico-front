import { Metodo } from './metodo';

export class ParametroUtil {
    
    public static URL_BASE              = "http://localhost:8090/api"//"http://54.90.163.248:8090/api"

    public static USER_STORAGE          = "usuario"
    public static CODE_USER_STORAGE     = "codigo"
    public static BASIC_AUTHENTICATION  = "basic"

    public static INIT  =  {
        headers : Metodo.getHeadersInvocation(),
        reportProgress: true,
        responseType: 'json',
      }

    public static GET       = "GET";
    public static POST      = "POST";
    public static PUT       = "PUT";
    public static DELETE    = "DELETE";


    public static LST_AULAS = "LST_AULAS";
    public static LST_SEXO = "LST_SEXO";
    public static LST_ESTADO_CIVIL = "LST_ESTADO_CIVIL";
    public static LST_PERFILES = "LST_PERFILES";
    public static LST_ESTADO_BASICO = "LST_ESTADO_BASICO";
    public static LST_ESTADO_ACTIVIDAD = "LST_ESTADO_ACTIVIDAD";
    
    

 
}
