import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreservationPage } from './areservation.page';

describe('AreservationPage', () => {
  let component: AreservationPage;
  let fixture: ComponentFixture<AreservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
