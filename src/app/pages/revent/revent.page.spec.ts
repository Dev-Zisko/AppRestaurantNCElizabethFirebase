import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReventPage } from './revent.page';

describe('ReventPage', () => {
  let component: ReventPage;
  let fixture: ComponentFixture<ReventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
