import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeventPage } from './devent.page';

describe('DeventPage', () => {
  let component: DeventPage;
  let fixture: ComponentFixture<DeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
