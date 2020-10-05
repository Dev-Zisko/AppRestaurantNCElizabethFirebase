import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcategoryPage } from './rcategory.page';

describe('RcategoryPage', () => {
  let component: RcategoryPage;
  let fixture: ComponentFixture<RcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
