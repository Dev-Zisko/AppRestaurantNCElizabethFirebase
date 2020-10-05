import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UfoodPage } from './ufood.page';

describe('UfoodPage', () => {
  let component: UfoodPage;
  let fixture: ComponentFixture<UfoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UfoodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UfoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
