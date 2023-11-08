import { TestBed } from '@angular/core/testing';

import { VariableUtilityService } from './variable-utility.service';

describe('VariableUtilityService', () => {
  let service: VariableUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
