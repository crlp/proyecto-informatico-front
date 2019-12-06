import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Activity } from 'src/shared/modelo/activity';
import { Question } from 'src/shared/modelo/question';
import { ActivityService } from 'src/shared/services/activity.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-activity-detail',
  templateUrl: './modal-activity-detail.component.html',
  styleUrls: ['./modal-activity-detail.component.css']
})
export class ModalActivityDetailComponent implements OnInit {

  question  : Question = null;

  constructor(
    public dialogRef: MatDialogRef<ModalActivityDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question, private activityService : ActivityService, private spinner : NgxSpinnerService) {

    this.question = data;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    
  }

}
