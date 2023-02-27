import { TestBed } from '@angular/core/testing';

import { UserRegisService } from './user-regis.service';

describe('UserRegisService', () => {
  let service: UserRegisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
