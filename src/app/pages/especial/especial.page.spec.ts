import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialPage } from './especial.page';

describe('EspecialPage', () => {
  let component: EspecialPage;
  let fixture: ComponentFixture<EspecialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
