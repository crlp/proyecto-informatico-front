import { Parametro } from './param';
import { SectionClass } from './section-class';
import { School } from './school';

export class Topic {

    codigo: string;
    titulo: string;
    descripcion: string;
    estado: Parametro;
    listaTemaSeccion: SectionClass[] = [];
    colegio: School;
    codisgo:string;
    

}
