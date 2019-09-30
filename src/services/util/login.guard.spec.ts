import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { Router } from '@angular/router';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard,{provide: Router, useClass:MockRouter}]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
