import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/modelo/usuario';
import { HttpResponse } from '@angular/common/http';
import { Parametro } from 'src/modelo/param';
import { ParametroUtil } from 'src/app/util/parametroUtil';
import { Metodo } from 'src/app/util/metodo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario           : Usuario     = null;
  listaSexo         : Parametro[] = [];
  listaEstadoCivil  : Parametro[] = [];
  listaEstado       : Parametro[] = [];
  listaPerfil       : Parametro[] = [];

  files             : File    = null
  image             : boolean =false

  constructor(private router: Router,private usuarioService: UsuarioService) {
    this.usuario      = new Usuario();
    this.usuario.foto = ParametroUtil.IMG_DEFAULT
    this.listadoParametros( ParametroUtil.LST_SEXO, 1 );
    this.listadoParametros( ParametroUtil.LST_ESTADO_CIVIL, 2 );
    this.listadoParametros( ParametroUtil.LST_PERFILES, 3 );
    this.listadoParametros( ParametroUtil.LST_ESTADO_BASICO, 4 );
  }
  
  ngOnInit() {
    this.listarUsuarios();
  }

  cerrar(event: Event){
     event.preventDefault();
     localStorage.removeItem( ParametroUtil.USER_STORAGE );
     localStorage.removeItem( ParametroUtil.CODE_USER_STORAGE );
     localStorage.removeItem( ParametroUtil.BASIC_AUTHENTICATION );
     this.router.navigate ( ['/login'] );
  }

  actualizar(){
    this.usuarioService.actualizarUsuario( this.usuario ).subscribe( 
      datos => {
        if( datos instanceof HttpResponse ) {
          Metodo.DIALOG_MESSAGE_SUCCESS('Updated user!')
          this.listarUsuarios();
        }
      },error => {
          Metodo.DIALOG_MESSAGE_ERROR('User data was not updated!')
      },
      () => {  });
  }

  onFileChanged(event: any) {
    if( event.target.files.length > 0 ){
      this.files = event.target.files[0];
    }
    this.image = true;
  }

  actualizarFoto(){
      if(this.image){
        this.usuarioService.onUpload(this.files,localStorage.getItem("codigo")).subscribe(datos =>{
            this.image=false;
            this.listarUsuarios();
        })
      }
  }

  onChangeSexo( p: any ) {
    this.listaSexo.forEach(sexo => {
      if(sexo.codigo == p.value){
        this.usuario.sexo = sexo;
      }
    });
  }

  onChangeCivil( p: any ) {
    this.listaEstadoCivil.forEach(estadoCivil => {
      if(estadoCivil.codigo == p.value){
        this.usuario.estadoCivil = estadoCivil;
      }
    });
  }

  onChangeEstado( p: any ) {
    this.listaEstado.forEach(estado => {
      if(estado.codigo == p.value){
        this.usuario.estado = estado;
      }
    });
  }

  onChangePerfil( p: any ) {
    this.listaPerfil.forEach(perfil => {
      if(perfil.codigo == p.value){
        this.usuario.perfil = perfil;
      }
    });
  }

  listadoParametros( codigo: string, tipo: number){

    this.usuarioService.listarParametros(codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        switch(tipo){
          case 1:
            this.listaSexo = Metodo.JSON_TO_OBJECT( datos.body );
            break;
          case 2: 
            this.listaEstadoCivil = Metodo.JSON_TO_OBJECT( datos.body );
            break;
          case 3:
            this.listaPerfil = Metodo.JSON_TO_OBJECT( datos.body );
            break;
          case 4:
            this.listaEstado = Metodo.JSON_TO_OBJECT( datos.body );
            break;
        }
      }
    })
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.usuario = Metodo.JSON_TO_OBJECT( datos.body );
      }
    })
  }
}
