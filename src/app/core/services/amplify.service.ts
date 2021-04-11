import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Observable, ReplaySubject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import { ICredentials } from 'aws-amplify/lib/Common/types/types';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AmplifyService {
  isAuthenticatedSubj: ReplaySubject<boolean>;

  get isAuthenticated(): Promise<boolean> {
    return Auth.currentAuthenticatedUser()
      .then(() => {
        this.isAuthenticatedSubj.next(true);
        return true;
      })
      .catch(() => {
        this.isAuthenticatedSubj.next(false);
        return false;
      });
  }

  constructor(private router: Router) {
    this.isAuthenticatedSubj = new ReplaySubject<boolean>(1);
  }

  async updateUser(
    attrs: Record<string, string | number | boolean | null | undefined>
  ): Promise<void> {
    console.log('updateUser');
    console.log(attrs);
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, attrs);
  }

  signIn(email: string, password: string): Observable<CognitoUser> {
    return fromPromise(
      Auth.signIn({
        username: email.toLocaleLowerCase(),
        password,
      })
    );
  }

  signUp(email: string, password: string): Observable<ISignUpResult> {
    return fromPromise(
      Auth.signUp({
        username: email.toLocaleLowerCase(),
        password,
        attributes: {
          email: email.toLocaleLowerCase(),
        },
      })
    );
  }

  confirmSignUp(email: string, code: string): Observable<any> {
    return fromPromise(Auth.confirmSignUp(email.toLocaleLowerCase(), code));
  }

  changePassword(
    user: CognitoUser,
    oldPassword: string,
    newPassword: string
  ): Observable<'SUCCESS'> {
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

  logout(): Observable<ICredentials> {
    return fromPromise(Auth.signOut()).pipe(
      tap(() => localStorage.clear()),
      tap(() => this.isAuthenticatedSubj.next(false)),
      tap(() => this.router.navigate(['/']))
    );
  }
}
