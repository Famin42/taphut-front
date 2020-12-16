import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signUp(email: string, password: string): Observable<boolean> {
    console.log('Service.register(): email=' + email + ', password=' + password);
    return of(true);
  }

  signIn(email: string, password: string): Observable<boolean> {
    console.log('Service.login(): email=' + email + ', password=' + password);
    return of(true);
  }
}
