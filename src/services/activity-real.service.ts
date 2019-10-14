import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { ActivityReal } from 'src/modelo/firebase/activity-real';
import { Usuario } from 'src/modelo/usuario';
import { Activity } from 'src/modelo/activity';
import { Participant } from 'src/modelo/firebase/participant';
import { Question } from 'src/modelo/question';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Answer } from 'src/modelo/answer';

@Injectable({
  providedIn: 'root'
})
export class ActivityRealService {
  
  usuarioSession     : Usuario;
  
  activityRealList    : AngularFireList<any>;
  activityRealObject    : AngularFireObject<any>;
  selectActivity  : ActivityReal = new ActivityReal();
  activitySelected: Activity;
  usuarioInput: Usuario;
  codigoActividad: string;

  constructor(private firebase: AngularFireDatabase) {
    
    this.usuarioSession = JSON.parse(localStorage.getItem(ParametroUtil.USER_STORAGE));
   }

  getActivitiesReal()
  {
    return this.activityRealList = this.firebase.list('activity-real/'+ this.selectActivity.codigoActividad) 
  }


  getActivitiesRealFire(order: string) {
    return this.activityRealList = this.firebase.list('activity-real/'+ order) 
  }


  insertarActivacionCodigoActividad(activityReal: ActivityReal)
  {
    this.selectActivity = activityReal;
    this.getActivitiesReal();
  }

  registrarParticipacion(usuario: Usuario, activity : Activity) {
    
    this.selectActivity.codigoActividad = activity.codigoAleatorio;
    
    let urlDatabase  = this.firebase.database.ref('activity-real/' + this.selectActivity.codigoActividad);
 
    this.activityRealList = this.firebase.list(urlDatabase) ;

    this.usuarioInput = new Usuario();
    this.usuarioInput.codigo  = usuario.codigo
    this.usuarioInput.nombres  = usuario.nombres
    this.usuarioInput.apellidos  = usuario.apellidos

    this.selectActivity.participants = this.usuarioInput;
    this.activityRealList.push(this.usuarioInput);
  }

  listenerParticipant(codigo: string) {
    return this.firebase.list('activity-real/'+ codigo + "/questions"); 

  }
  
  listenerParticipantes (codigo: string, key : String){
    return this.activityRealList = this.firebase.list('activity-real/' + codigo + "/questions/"+ key + "/listaRespuestas/participants");
  }

  listenerPregunta (codigo: string, key : String){
    return this.activityRealObject = this.firebase.object('activity-real/' + codigo + "/questions/"+ key + "/activado");
  }

  registraPreguntaActiva (codigo: string, key : String){
    let urlDatabase = this.firebase.database.ref('activity-real/' + codigo + "/questions/"+ key + "/activado");
    this.firebase.object(urlDatabase).set(1) ;
  }

  registrarParticipanteRespuestas(codigo: string, key : string, usuarioParticipante : Usuario) {
    let urlDatabase = this.firebase.database.ref('activity-real/' + codigo + "/questions/"+ key + "/listaRespuestas/participants");
    console.log('URL ' + urlDatabase)
    
    this.activityRealList = this.firebase.list(urlDatabase) ;
    this.activityRealList.push(usuarioParticipante);
    
  }


  registrarPreguntas(codigo: string, listaPreguntas : Array<Question>) {
    let urlDatabase  = this.firebase.database.ref('activity-real/' + codigo + "/questions");
    console.log(urlDatabase);
    this.activityRealList = this.firebase.list(urlDatabase) ;

    listaPreguntas.forEach(element => {
      element.activado = '0'
      this.activityRealList.push(element);
    });   
  }
}
