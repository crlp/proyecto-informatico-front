import { Parametro } from './param';
import { Usuario } from './usuario';
import { Topic } from './topic';
import { Question } from './question';

export class Activity {

    codigo: string;
    codigoAleatorio : string;
    profesor: Usuario;
    tipoActividad : Parametro;
    tema : Topic;
    titulo : string;
    descripcion : string;
    estado : Parametro;
    listaPregunta : Array<Question>;
    

}
