import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UspecialPage } from './uspecial.page';

describe('UspecialPage', () => {
  let component: UspecialPage;
  let fixture: ComponentFixture<UspecialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UspecialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
