import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthPortalService } from './auth-portal.service';
import { AUTHP_CONFIG, AuthPortalConfig } from './auth-portal-config';
import { AuthPortalTestInterceptor } from './auth-portal.interceptor';
import { UserData } from './user-data';

const TEST_AUTHP_CONFIG: AuthPortalConfig = {
  baseUrl: 'https://auth.myfiosgateway.com:8443/',
};

const WHOAMI_ENDPOINT: string = TEST_AUTHP_CONFIG.baseUrl + 'whoami';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('AuthPortalService', () => {
  let service: AuthPortalService;
  let httpMock: HttpTestingController;
  var originalTimeout;

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
          useClass: AuthPortalTestInterceptor,
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
    let expUserData = new UserData({ name: 'Anonymous', email: 'anonymous@localhost' });
    expect(service.userData).toEqual(expUserData);
  });

  it('#whoami should return authorized user', (done: DoneFn) => {
    let rawData = {
      exp: 1638738221,
      jti: 'Szwbb9r9xnMyYGPNHlfGzIPVW9TuKcUerwLncGGPm',
      iat: 1638734621,
      iss: 'https://auth.myfiosgateway.com:8443/login',
      nbf: 1638734561000,
      sub: 'webadmin',
      email: 'webadmin@localdomain.local',
      roles: ['authp/admin', 'authp/user'],
      origin: 'local',
      addr: '10.0.2.2',
    };
    let expUserData = new UserData(rawData);

    service.whoami().subscribe((data) => {
      expect(data).toEqual(expUserData);
      done();
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: WHOAMI_ENDPOINT,
    });
    req.flush(rawData, { status: 200, statusText: '' });
  });

  it('#whoami should return error for unauthorized user', (done: DoneFn) => {
    let rawData = { error: true, message: 'Access denied', timestamp: '2021-12-13T16:50:36.20580249Z' };
    service.whoami().subscribe(
      (data) => {
        fail('received unexpected data');
        console.log(data);
      },
      (error) => {
        const errStatus = '401';
        const errMessage = 'Http failure response for https://auth.myfiosgateway.com:8443/whoami: 401 ';
        expect(error).toEqual(`Error Code: ${errStatus}\nMessage: ${errMessage}`);
        done();
      }
    );

    const req = httpMock.expectOne({
      method: 'GET',
      url: WHOAMI_ENDPOINT,
    });
    req.flush(rawData, { status: 401, statusText: '' });
  });
});
