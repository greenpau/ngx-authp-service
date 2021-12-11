import { Injectable } from '@angular/core';
import { PersonaData } from './auth-portal-persona';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthPortalService {
  baseUrl = 'enter-your-api-url';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.http = http;
  }

  /* Return base url for the authentication portal */
  public getBaseURL(): string {
    return this.baseUrl;
  }

  public whoami(): Observable<PersonaData> {
    const resp = this.http.get(`${this.baseUrl}/whoami`);
    console.log(resp);
    const persona: PersonaData = {};
    persona.name = 'Anonymous';
    persona.email = 'anonymous@localhost';
    return of(persona);
  }

  // Handle Errors
  error(resp: HttpErrorResponse) {
    let msg = '';
    if (resp.error instanceof ErrorEvent) {
      msg = resp.error.message;
    } else {
      msg = `Error Code: ${resp.status}\nMessage: ${resp.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
