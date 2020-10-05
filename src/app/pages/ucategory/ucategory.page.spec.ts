import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcategoryPage } from './ucategory.page';

describe('UcategoryPage', () => {
  let component: UcategoryPage;
  let fixture: ComponentFixture<UcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
