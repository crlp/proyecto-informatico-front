import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';
import { Usuario } from 'src/modelo/usuario';
import { HttpResponse } from '@angular/common/http';
import { Metodo } from 'src/app/util/metodo';
import { ParametroUtil } from 'src/app/util/parametroUtil';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario : Usuario = null;

  showAlumno   = false
  showProfesor = false

  constructor(private usuarioService: UsuarioService) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.listarUsuarios(); 
  }

  listarUsuarios(){
    this.usuarioService.listarUsuarios().subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.usuario= Metodo.JSON_TO_OBJECT(datos.body);
        localStorage.setItem("usuario",JSON.stringify(datos.body));
        this.mostrarMenu();
      }
    })
  } 

  mostrarMenu() {
    if(this.usuario.perfil.valor == ParametroUtil.FLAG_STUDENT){
      this.showAlumno = true;
    }else if(this.usuario.perfil.valor == ParametroUtil.FLAG_TEACHER){
      this.showProfesor = true;
    }
  }

}
