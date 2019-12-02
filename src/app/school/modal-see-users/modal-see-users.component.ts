import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/modelo/usuario';


export interface PeriodicElement {
  names: string;
  user: string;
  phone: string;
}

@Component({
  selector: 'app-modal-see-users',
  templateUrl: './modal-see-users.component.html',
  styleUrls: ['./modal-see-users.component.css']
})
export class ModalSeeUsersComponent implements OnInit {

  dataSource : Usuario[] = []
  displayedColumns: string[] = ['names', 'user', 'phone'];

  constructor() { }

  ngOnInit() {
  }

}
