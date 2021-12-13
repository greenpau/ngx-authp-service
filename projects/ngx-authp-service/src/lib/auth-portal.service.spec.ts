import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthPortalService } from './auth-portal.service';
import { AUTHP_CONFIG, AuthPortalConfig } from './auth-portal-config';
import { AuthPortalInterceptor } from './auth-portal.interceptor';
import { UserData } from './user-data';

const TEST_AUTHP_CONFIG: AuthPortalConfig = {
  baseUrl: 'https://auth.myfiosgateway.com:8443/',
};

describe('AuthPortalService', () => {
  let service: AuthPortalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AUTHP_CONFIG,
          useValue: TEST_AUTHP_CONFIG,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthPortalInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(AuthPortalService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have valid config with base url', () => {
    let cfg = service.getConfig();
    expect(cfg.baseUrl).toEqual('https://auth.myfiosgateway.com:8443');
  });

  it('should have anonymous persona at init', () => {
    let data = new UserData();
    data.name = 'Anonymous';
    data.email = 'anonymous@localhost';
    expect(service.userData).toEqual(data);
  });
});
