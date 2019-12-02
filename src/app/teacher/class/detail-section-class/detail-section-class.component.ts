import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SectionClass } from 'src/modelo/section-class';

@Component({
  selector: 'app-detail-section-class',
  templateUrl: './detail-section-class.component.html',
  styleUrls: ['./detail-section-class.component.css']
})
export class DetailSectionClassComponent implements OnInit {

  data : string;
  constructor(private  dialogRef:  MatDialogRef<DetailSectionClassComponent>, 
    @Inject(MAT_DIALOG_DATA) data : SectionClass) {
      console.log(data)
      this.data = data.contenidoHtml;
     }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

  verVistaPrevia (sectionClass : SectionClass){
    
  }
  

}
