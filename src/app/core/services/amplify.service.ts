import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Observable, ReplaySubject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import { ICredentials } from 'aws-amplify/lib/Common/types/types';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AmplifyService {
  // TODO: update checking is auer auth method
  isAuthenticatedSubj: ReplaySubject<boolean>;

  // TODO: update checking is auer auth method
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

  updateUserAttributes(
    attrs: Record<string, string | number | boolean | null | undefined>
  ): Observable<any> {
    console.log('updateUser');
    console.log(attrs);
    return fromPromise(Auth.currentAuthenticatedUser()).pipe(
      tap((user: CognitoUser) => console.log(`Auth.currentAuthenticatedUser(): ${user}`)),
      switchMap((user: any) => fromPromise(Auth.updateUserAttributes(user, attrs))),
      tap((data: any) => console.log(`Auth.updateUserAttributes: ${data}`))
    );
  }

  signIn({ email, password }: { email: string; password: string }): Observable<CognitoUser> {
    return fromPromise(
      Auth.signIn({
        username: email.toLocaleLowerCase(),
        password,
      })
    ).pipe(tap((data: any) => console.log(`Amplify.signIn: ${data}`)));
  }

  // TODO: add to effects
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

  // TODO: add to effects
  confirmSignUp(email: string, code: string): Observable<any> {
    return fromPromise(Auth.confirmSignUp(email.toLocaleLowerCase(), code));
  }

  // TODO: add to effects
  changePassword(
    user: CognitoUser,
    oldPassword: string,
    newPassword: string
  ): Observable<'SUCCESS'> {
    return fromPromise(Auth.changePassword(user, oldPassword, newPassword)).pipe(
      tap((data: any) => console.log(`Amplify.changePassword: ${data}`))
    );
  }

  // TODO: add to effects
  forgotPassword(email: string): Observable<any> {
    return fromPromise(Auth.forgotPassword(email.toLocaleLowerCase()));
  }

  // TODO: add to effects
  forgotPasswordSubmit(email: string, code: string, password: string): Observable<any> {
    return fromPromise(Auth.forgotPasswordSubmit(email.toLocaleLowerCase(), code, password));
  }

  // TODO: add to state
  currentAuthenticatedUser(): Observable<CognitoUser> {
    return fromPromise(Auth.currentAuthenticatedUser());
  }

  // TODO: add to state
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
