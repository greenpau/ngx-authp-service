import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthPortalService } from './auth-portal.service';

describe('AuthPortalService', () => {
  let service: AuthPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
