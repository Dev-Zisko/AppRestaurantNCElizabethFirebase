import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcategoryPage } from './ecategory.page';

describe('EcategoryPage', () => {
  let component: EcategoryPage;
  let fixture: ComponentFixture<EcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
