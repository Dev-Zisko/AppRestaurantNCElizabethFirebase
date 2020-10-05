import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdspecialPage } from './ddspecial.page';

describe('DdspecialPage', () => {
  let component: DdspecialPage;
  let fixture: ComponentFixture<DdspecialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdspecialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
