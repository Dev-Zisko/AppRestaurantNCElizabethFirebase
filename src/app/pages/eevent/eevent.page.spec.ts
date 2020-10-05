import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EeventPage } from './eevent.page';

describe('EeventPage', () => {
  let component: EeventPage;
  let fixture: ComponentFixture<EeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EeventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
