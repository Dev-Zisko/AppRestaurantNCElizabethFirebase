import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DspecialPage } from './dspecial.page';

describe('DspecialPage', () => {
  let component: DspecialPage;
  let fixture: ComponentFixture<DspecialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspecialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
