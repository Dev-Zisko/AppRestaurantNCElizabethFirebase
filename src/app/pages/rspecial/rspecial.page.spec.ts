import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RspecialPage } from './rspecial.page';

describe('RspecialPage', () => {
  let component: RspecialPage;
  let fixture: ComponentFixture<RspecialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RspecialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
