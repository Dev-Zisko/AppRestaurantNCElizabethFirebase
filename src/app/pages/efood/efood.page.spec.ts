import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfoodPage } from './efood.page';

describe('EfoodPage', () => {
  let component: EfoodPage;
  let fixture: ComponentFixture<EfoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfoodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
