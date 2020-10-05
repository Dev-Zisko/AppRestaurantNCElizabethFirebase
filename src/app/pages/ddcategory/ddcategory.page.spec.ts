import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdcategoryPage } from './ddcategory.page';

describe('DdcategoryPage', () => {
  let component: DdcategoryPage;
  let fixture: ComponentFixture<DdcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
