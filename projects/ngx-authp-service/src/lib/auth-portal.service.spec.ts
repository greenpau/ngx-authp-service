import { TestBed } from '@angular/core/testing';

import { AuthPortalService } from './auth-portal.service';

describe('AuthPortalService', () => {
  let service: AuthPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
