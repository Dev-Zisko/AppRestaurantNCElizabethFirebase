import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdfoodPage } from './sdfood.page';

describe('SdfoodPage', () => {
  let component: SdfoodPage;
  let fixture: ComponentFixture<SdfoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdfoodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdfoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
