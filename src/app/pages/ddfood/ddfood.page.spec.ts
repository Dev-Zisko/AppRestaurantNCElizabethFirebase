import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdfoodPage } from './ddfood.page';

describe('DdfoodPage', () => {
  let component: DdfoodPage;
  let fixture: ComponentFixture<DdfoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdfoodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdfoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
