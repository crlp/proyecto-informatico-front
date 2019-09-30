import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/user/usuario.service';
import { Usuario } from 'src/modelo/usuario';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: Usuario;

  showAlumno = false
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
        this.usuario=JSON.parse(JSON.stringify(datos.body));
        localStorage.setItem("usuario",JSON.stringify(datos.body));
        this.mostrarMenu();
      }
    })
  } 

  mostrarMenu() {
    if(this.usuario.perfil.valor == "EST"){
      this.showAlumno = true;
    }else if(this.usuario.perfil.valor == "PRO"){
      this.showProfesor = true;
    }
  }

}
