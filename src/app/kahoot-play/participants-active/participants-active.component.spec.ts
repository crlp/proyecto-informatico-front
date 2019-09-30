import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsActiveComponent } from './participants-active.component';

describe('ParticipantsActiveComponent', () => {
  let component: ParticipantsActiveComponent;
  let fixture: ComponentFixture<ParticipantsActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
