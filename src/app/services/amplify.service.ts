import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';
import {from, Observable, of, scheduled} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {ISignUpResult, ICognitoUserData, CognitoUser} from 'amazon-cognito-identity-js';
import {ICredentials} from 'aws-amplify/lib/Common/types/types';

@Injectable({
  providedIn: 'root'
})
export class AmplifyService {
// TODO uncomment when fixed
  constructor() {
  }

  signIn(email: string, password: string): Observable<CognitoUser> {
    return of();
    // return fromPromise(
    //   Auth.signIn({
    //     username: email.toLocaleLowerCase(),
    //     password,
    //   }));
  }

  signOut(): Observable<any> {
    return of();
    // return fromPromise(Auth.signOut());
  }

  signUp(email: string, password: string): Observable<ISignUpResult> {
    return of();
    // return fromPromise(
    //   Auth.signUp({
    //     username: email.toLocaleLowerCase(),
    //     password
    //   }));
  }

  confirmSignUp(email: string, code: string): Observable<any> {
    return of();
    // return fromPromise(Auth.confirmSignUp(email.toLocaleLowerCase(), code));
  }

  changePassword(user: CognitoUser, oldPassword: string, newPassword: string): Observable<'SUCCESS'> {
    return of();
    // return fromPromise(Auth.changePassword(user, oldPassword, newPassword));
  }

  forgotPassword(email: string): Observable<any> {
    return of();
    // return fromPromise(Auth.forgotPassword(email.toLocaleLowerCase()));
  }

  forgotPasswordSubmit(email: string, code: string, password: string): Observable<any> {
    return of();
    // return fromPromise(Auth.forgotPasswordSubmit(email.toLocaleLowerCase(), code, password));
  }

  currentAuthenticatedUser(): Observable<CognitoUser> {
    return of();
    // return fromPromise(Auth.currentAuthenticatedUser());
  }

  currentUserCredentials(): Observable<ICredentials> {
    return of();
    // return fromPromise(Auth.currentUserCredentials());
  }
}
