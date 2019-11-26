import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.css']
})
export class ImportStudentComponent implements OnInit {

  willDownload = false;

  @Output() 
  childEvent =  new EventEmitter
  
  constructor() { }

  ngOnInit() {
  }


  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
       // initial[name] = 
        return XLSX.utils.sheet_to_json(sheet);//initial;
      }, {});

      this.childEvent.emit(JSON.stringify(jsonData));

    }
    reader.readAsBinaryString(file);
  }

}
