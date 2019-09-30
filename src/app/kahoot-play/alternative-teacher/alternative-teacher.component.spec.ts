import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeTeacherComponent } from './alternative-teacher.component';

describe('AlternativeTeacherComponent', () => {
  let component: AlternativeTeacherComponent;
  let fixture: ComponentFixture<AlternativeTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
