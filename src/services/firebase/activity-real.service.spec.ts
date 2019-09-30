import { TestBed } from '@angular/core/testing';

import { ActivityRealService } from './activity-real.service';

describe('ActivityRealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityRealService = TestBed.get(ActivityRealService);
    expect(service).toBeTruthy();
  });
});
