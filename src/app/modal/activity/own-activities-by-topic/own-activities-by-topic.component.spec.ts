import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnActivitiesByTopicComponent } from './own-activities-by-topic.component';

describe('OwnActivitiesByTopicComponent', () => {
  let component: OwnActivitiesByTopicComponent;
  let fixture: ComponentFixture<OwnActivitiesByTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnActivitiesByTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnActivitiesByTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
