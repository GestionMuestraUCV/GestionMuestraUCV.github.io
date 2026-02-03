/*import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      //TestBed.runInInjectionContext(() => authGuard(...guardParameters));
      TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});*/


import { TestBed } from '@angular/core/testing';
import { AuthGuard  } from './guard';

describe('AuthGuard', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});