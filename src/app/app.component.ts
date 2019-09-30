import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import {NgxSpinnerService}  from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TeEnsenoFront';
  
  constructor(private router: Router, private spinner : NgxSpinnerService) {
   }

  cerrar(event: Event){
    event.preventDefault();
    console.log("cerrando session");
    localStorage.removeItem("usuario");
    localStorage.removeItem("codigo");
    localStorage.removeItem("basic");
    this.router.navigate (['/login']);

  }
  
  ngOnInit() {
    if(localStorage.getItem('basic') === null) {
     }else {
    }
  }
}

