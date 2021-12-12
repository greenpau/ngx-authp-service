import { InjectionToken } from '@angular/core';
export const AUTHP_CONFIG = new InjectionToken<AuthPortalConfig>('AUTHP_CONFIG');

export interface IAuthPortalConfig {
  baseUrl?: string;
}

export class AuthPortalConfig implements IAuthPortalConfig {
  baseUrl?: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}
