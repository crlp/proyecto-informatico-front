import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOfTopicComponent } from './question-of-topic.component';

describe('QuestionOfTopicComponent', () => {
  let component: QuestionOfTopicComponent;
  let fixture: ComponentFixture<QuestionOfTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionOfTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionOfTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
