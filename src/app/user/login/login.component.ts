import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/services/usuario.service';
import { MensajeUtil } from 'src/app/util/mensajeUtil';
import { ParametroUtil } from 'src/app/util/parametroUtil';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mensajeError = MensajeUtil.EMPTY;
  procesando = 0;
  respuesta;

  constructor(private router: Router, private usuarioService: UsuarioService, private spinner: NgxSpinnerService) {
  }

  login(form: NgForm) {
    if (form.value.username === MensajeUtil.EMPTY) {
      this.mensajeError = MensajeUtil.CODIGO_USUARIO_EMPTY;
      this.setProcesando(2);
    }else if (form.value.password === MensajeUtil.EMPTY) {
      this.mensajeError = MensajeUtil.CONTRASENA_EMPTY
      this.setProcesando(2);
    }else {
      this.cargando(true)
      this.usuarioService.login(form.value.username, form.value.password).subscribe(event => {
        if (event instanceof HttpResponse) {
          this.respuesta = event.body;
          localStorage.setItem(ParametroUtil.CODE_USER_STORAGE, this.respuesta.codigo);
          if (this.respuesta.valido === MensajeUtil.TEXT_ERROR) {
            this.mensajeError = this.respuesta.mensaje;
            this.setProcesando(2);
          }else {
            this.setProcesando(1);
            localStorage.setItem(ParametroUtil.USER_STORAGE, form.value.username);
            this.router.navigate(['/menu']);
          }
          this.cargando(false)
        }
      }, error => {
        this.mensajeError = MensajeUtil.CREDENCIALES_ERROR
        this.setProcesando(2);
        this.cargando(false)
      })
    }
  }

  cargando(status : boolean){
    if(status){ this.spinner.show(); }
    else { this.spinner.hide(); }
  }

  setProcesando(estado){
    this.procesando = estado;
  }

}
