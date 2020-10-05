import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EreservationPage } from './ereservation.page';

describe('EreservationPage', () => {
  let component: EreservationPage;
  let fixture: ComponentFixture<EreservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EreservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EreservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
