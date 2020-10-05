import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreservationPage } from './dreservation.page';

describe('DreservationPage', () => {
  let component: DreservationPage;
  let fixture: ComponentFixture<DreservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
