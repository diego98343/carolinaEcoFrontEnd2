import { TestBed } from '@angular/core/testing';

import { LogINService } from './log-in.service';

describe('LogINService', () => {
  let service: LogINService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogINService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
