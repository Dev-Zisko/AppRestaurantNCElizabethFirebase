import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SreservationPage } from './sreservation.page';

describe('SreservationPage', () => {
  let component: SreservationPage;
  let fixture: ComponentFixture<SreservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SreservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SreservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
