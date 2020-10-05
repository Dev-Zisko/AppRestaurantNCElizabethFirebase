import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcategoryPage } from './dcategory.page';

describe('DcategoryPage', () => {
  let component: DcategoryPage;
  let fixture: ComponentFixture<DcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
