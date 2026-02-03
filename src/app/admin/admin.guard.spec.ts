import { TestBed } from '@angular/core/testing';

import { AdminGuard  } from './admin.guard';

describe('PwaService', () => {
  let service: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

