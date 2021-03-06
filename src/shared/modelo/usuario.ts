import { Parametro } from './param';
import { School } from './school';

export class Usuario {

    codigo: string;
    usuario: string;
    nombres: string;
    apellidos: string;
    edad: string;
    sexo: Parametro;
    estadoCivil: Parametro;
    aula: Parametro;
    telefonoCasa: string;
    telefonoCelular: string;
    direccion: string;
    estado: Parametro;
    perfil: Parametro;
    gradoInstruccion: string;
    foto: string;
    codigoRespuesta : string;
    colegio: School;
    

}
