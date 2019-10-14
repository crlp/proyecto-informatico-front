import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { Topic } from 'src/modelo/topic';
import { TopicService } from 'src/services/topic.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.css']
})
export class SearchTopicComponent implements OnInit {

  topicSelected   : Topic         = null;
  listaTemasArray : Array<Topic>  = [];
  myControl       : FormControl   = new FormControl();
  filteredOptions : Observable< Array< Topic > >;


  @Output() 
  childEvent =  new EventEmitter

  constructor(private topicService: TopicService) { 
    this.topicSelected = new Topic();
  }

  ngOnInit() {
    this.listarTemas();
  }

  selectedclient(event) {
    this.topicSelected = event.option.value;
    this.confirmarTema ();
  }

  getOptionText(option : any) {
    if(option != null) {
      return option.titulo
    }else {
      return '';
    }
  }

  listarTemas(){
    this.topicService.listaTemas().subscribe(datos =>{
      if (datos instanceof HttpResponse) {
        this.filteredOptions=JSON.parse(JSON.stringify(datos.body));
      }
    })
  }

  confirmarTema (){
    this.childEvent.emit(this.topicSelected);
  }
}
