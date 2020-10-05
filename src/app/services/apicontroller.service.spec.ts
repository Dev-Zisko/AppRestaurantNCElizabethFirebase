import { TestBed } from '@angular/core/testing';

import { ApicontrollerService } from './apicontroller.service';

describe('ApicontrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApicontrollerService = TestBed.get(ApicontrollerService);
    expect(service).toBeTruthy();
  });
});
