import { Answer } from './answer';
import { Parametro } from './param';

export class Question {
    $key : string;
    codigo : string;
    pregunta: string;
    listaRespuestas : Array<Answer> ;
    estado : Parametro;
    activado : string;
    
}
