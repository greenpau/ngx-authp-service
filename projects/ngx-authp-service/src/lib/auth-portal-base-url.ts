import { InjectionToken } from '@angular/core';

export const AUTHP_BASE_URL = new InjectionToken<String>('AUTHP_BASE_URL', {
  providedIn: 'root',
  factory: () => '/api',
});
