import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeStudentComponent } from './alternative-student.component';

describe('AlternativeStudentComponent', () => {
  let component: AlternativeStudentComponent;
  let fixture: ComponentFixture<AlternativeStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
