import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Activity } from 'src/modelo/activity';
import { Question } from 'src/modelo/question';
import { ActivityService } from 'src/services/activity/activity.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-activity-detail',
  templateUrl: './modal-activity-detail.component.html',
  styleUrls: ['./modal-activity-detail.component.css']
})
export class ModalActivityDetailComponent implements OnInit {
  question: Question;

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
