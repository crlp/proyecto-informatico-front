import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerOfQuestionTeacherComponent } from './answer-of-question-teacher.component';

describe('AnswerOfQuestionTeacherComponent', () => {
  let component: AnswerOfQuestionTeacherComponent;
  let fixture: ComponentFixture<AnswerOfQuestionTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerOfQuestionTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerOfQuestionTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
