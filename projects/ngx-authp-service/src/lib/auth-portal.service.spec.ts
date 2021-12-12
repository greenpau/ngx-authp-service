import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthPortalService, AuthPortalConfig, AUTHP_CONFIG } from './auth-portal.service';
import { PersonaData } from './auth-portal-persona';

const TEST_AUTHP_CONFIG: AuthPortalConfig = {
  baseUrl: 'https://auth.myfiosgateway.com:8443/',
};

describe('AuthPortalService', () => {
  let service: AuthPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: AUTHP_CONFIG,
          useValue: TEST_AUTHP_CONFIG,
        },
      ],
    });
    service = TestBed.inject(AuthPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have valid config with base url', () => {
    let cfg = service.getConfig();
    expect(cfg.baseUrl).toEqual('https://auth.myfiosgateway.com:8443/');
  });

  it('should have anonymous persona at init', () => {
    let expectedPersona = new PersonaData();
    expectedPersona.name = 'Anonymous';
    expectedPersona.email = 'anonymous@localhost';
    expect(service.persona).toEqual(expectedPersona);
  });
});
