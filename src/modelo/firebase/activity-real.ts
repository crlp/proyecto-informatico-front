import { Participant } from './participant';
import { Usuario } from '../usuario';

export class ActivityReal{
    $key            : string;
    codigoActividad : string;
    codigo          : string;
    participants    : Usuario;
    listaParticipante    : Usuario [];
}
