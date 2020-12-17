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

  get isAuthenticated(): Promise<boolean> {
    return Auth.currentAuthenticatedUser().then(() => { return true; })
    .catch(() => { return false; });
  }

  constructor() {
  }

  signIn(email: string, password: string): Observable<CognitoUser> {
    return fromPromise(
      Auth.signIn({
        username: email.toLocaleLowerCase(),
        password,
      }));
  }

  signOut(): Observable<any> {
    return fromPromise(Auth.signOut());
  }

  signUp(email: string, password: string): Observable<ISignUpResult> {
    return fromPromise(
      Auth.signUp({
        username: email.toLocaleLowerCase(),
        password,
        attributes: {
          email: email.toLocaleLowerCase(),
        }
      }));
  }

  confirmSignUp(email: string, code: string): Observable<any> {
    return fromPromise(Auth.confirmSignUp(email.toLocaleLowerCase(), code));
  }

  changePassword(user: CognitoUser, oldPassword: string, newPassword: string): Observable<'SUCCESS'> {
    return fromPromise(Auth.changePassword(user, oldPassword, newPassword));
  }

  forgotPassword(email: string): Observable<any> {
    return fromPromise(Auth.forgotPassword(email.toLocaleLowerCase()));
  }

  forgotPasswordSubmit(email: string, code: string, password: string): Observable<any> {
    return fromPromise(Auth.forgotPasswordSubmit(email.toLocaleLowerCase(), code, password));
  }

  currentAuthenticatedUser(): Observable<CognitoUser> {
    return fromPromise(Auth.currentAuthenticatedUser());
  }

  currentUserCredentials(): Observable<ICredentials> {
    return fromPromise(Auth.currentUserCredentials());
  }
}
