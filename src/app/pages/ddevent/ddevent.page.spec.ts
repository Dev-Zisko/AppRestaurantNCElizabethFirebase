import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeventPage } from './ddevent.page';

describe('DdeventPage', () => {
  let component: DdeventPage;
  let fixture: ComponentFixture<DdeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
