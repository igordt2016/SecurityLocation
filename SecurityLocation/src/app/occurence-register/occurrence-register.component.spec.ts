import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {OccurrenceRegisterComponent } from './occurrence-register.component';

describe('OccurrenceRegisterComponent', () => {
  let component:OccurrenceRegisterComponent;
  let fixture: ComponentFixture<OccurrenceRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OccurrenceRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurrenceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
