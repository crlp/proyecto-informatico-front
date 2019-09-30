import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActivityDetailComponent } from './modal-activity-detail.component';

describe('ModalActivityDetailComponent', () => {
  let component: ModalActivityDetailComponent;
  let fixture: ComponentFixture<ModalActivityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActivityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
