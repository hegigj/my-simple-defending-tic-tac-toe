import { TestBed } from '@angular/core/testing';

import { BusinessLogicService } from './business-logic.service';

describe('BusinessLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessLogicService = TestBed.get(BusinessLogicService);
    expect(service).toBeTruthy();
  });
});
