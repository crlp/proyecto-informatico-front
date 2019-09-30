import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultQuestionModalComponent } from './result-question-modal.component';

describe('ResultQuestionModalComponent', () => {
  let component: ResultQuestionModalComponent;
  let fixture: ComponentFixture<ResultQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultQuestionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
