import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/user/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/modelo/usuario';
import { HttpResponse } from '@angular/common/http';
import { Parametro } from 'src/modelo/param';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { ParametroUtil } from 'src/app/util/parametroUtil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaUsuario: Usuario;
  listaSexo: Parametro [] =[];
  listaEstadoCivil: Parametro[]=[];
  listaEstado: Parametro[]=[];
  listaPerfil: Parametro[]=[];

  constructor(private router: Router,private usuarioService: UsuarioService) {
    this.listaUsuario=new Usuario();
    this.listaUsuario.foto="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
     this.listadoParametros(ParametroUtil.LST_SEXO,1);
     this.listadoParametros(ParametroUtil.LST_ESTADO_CIVIL,2);
     this.listadoParametros(ParametroUtil.LST_PERFILES,3);
     this.listadoParametros(ParametroUtil.LST_ESTADO_BASICO,4);
     this.files = [];
   }
  
   cerrar(event: Event){
     event.preventDefault();
     localStorage.removeItem(ParametroUtil.USER_STORAGE);
     localStorage.removeItem(ParametroUtil.CODE_USER_STORAGE);
     localStorage.removeItem(ParametroUtil.BASIC_AUTHENTICATION);
     this.router.navigate (['/login']);

   }
  ngOnInit() {
    this.listarUsuarios();
  }

  actualizar(){
    console.log(this.listaUsuario);
    

    this.usuarioService.actualizarUsuario(this.listaUsuario).subscribe(datos =>{
      
      if(datos instanceof HttpResponse) {
        swal.fire(
          'Good job!',
          'Updated user data!!',
          'success'
        )
          this.listarUsuarios();
        }
      },error => {
        swal.fire(
          'Problems!',
          'User data was not updated!!',
          'error'
        )
      },
      () => {
        // No errors, route to new page
      });

  }
  public files;
  image:boolean=false;

  onFileChanged(event: any) {
    if(event.target.files.length>0){
      this.files = event.target.files[0];
    }
    this.image=true;
    
  }
  actualizarFoto(){
      if(this.image){
        this.usuarioService.onUpload(this.files,localStorage.getItem("codigo")).subscribe(datos =>{
            this.image=false;
            this.listarUsuarios();
        })
      }
  }

  onChangeSexo(p) {
    for(let i=0; i< this.listaSexo.length; i++){
      if(this.listaSexo[i].codigo == p.value){
        this.listaUsuario.sexo = this.listaSexo[i];
      }
    }
  }

  onChangeCivil(p) {
    for(let i=0; i< this.listaEstadoCivil.length; i++){
      if(this.listaEstadoCivil[i].codigo == p.value){
        this.listaUsuario.estadoCivil = this.listaEstadoCivil[i];
      }
    }
  }

  onChangeEstado(p) {
    for(let i=0; i< this.listaEstado.length; i++){
      if(this.listaEstado[i].codigo == p.value){
        this.listaUsuario.estado = this.listaEstado[i];
      }
    }
  }

  onChangePerfil(p) {
    for(let i=0; i< this.listaPerfil.length; i++){
      if(this.listaPerfil[i].codigo == p.value){
        this.listaUsuario.perfil = this.listaPerfil[i];
      }
    }
  }

  listadoParametros(codigo, tipo){

    this.usuarioService.listarParametros(codigo).subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        if(tipo==1){
          this.listaSexo =JSON.parse(JSON.stringify(datos.body));
        }else if (tipo==2){
          this.listaEstadoCivil =JSON.parse(JSON.stringify(datos.body));
        }else if (tipo==3){
          this.listaPerfil =JSON.parse(JSON.stringify(datos.body));
        }else if (tipo==4){
          this.listaEstado =JSON.parse(JSON.stringify(datos.body));
        }
      }
    })
  }

  listarUsuarios(){
        this.usuarioService.listarUsuarios().subscribe(datos =>{
          if (datos instanceof HttpResponse) {
            this.listaUsuario=JSON.parse(JSON.stringify(datos.body));
          }
      })
  }
}
