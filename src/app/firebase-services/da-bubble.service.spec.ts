import { TestBed } from '@angular/core/testing';

import { DaBubbleService } from './da-bubble.service';

describe('DaBubbleService', () => {
  let service: DaBubbleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaBubbleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
