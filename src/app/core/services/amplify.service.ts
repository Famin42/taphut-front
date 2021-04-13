import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class AmplifyService {
  currentUserSubj: ReplaySubject<CognitoUser | undefined>;
  isAuthenticatedSubj: ReplaySubject<boolean>;

  get isAuthenticated(): Promise<CognitoUser | undefined> {
    return Auth.currentAuthenticatedUser()
      .then((user: CognitoUser | undefined) => {
        this.isAuthenticatedSubj.next(true);
        this.updateUserState().pipe(first()).subscribe();
        return user;
      })
      .catch(() => {
        this.updateUserState().pipe(first()).subscribe();
        this.isAuthenticatedSubj.next(false);
        return undefined;
      });
  }

  constructor(private router: Router) {
    this.isAuthenticatedSubj = new ReplaySubject<boolean>(1);
    this.currentUserSubj = new ReplaySubject<CognitoUser | undefined>(1);
    this.updateUserState();
  }

  updateUserAttributes(
    attrs: Record<string, string | number | boolean | null | undefined>
  ): Observable<CognitoUser | undefined> {
    console.log('updateUser');
    console.log(attrs);
    return from(Auth.currentAuthenticatedUser()).pipe(
      tap((user: any) => console.log(user)),
      switchMap((user: any) => from(Auth.updateUserAttributes(user, attrs))),
      switchMap(() => this.updateUserState())
    );
  }

  signIn({ email, password }: { email: string; password: string }): Observable<CognitoUser> {
    return from(
      Auth.signIn({
        username: email.toLocaleLowerCase(),
        password,
      })
    ).pipe(
      switchMap(() => this.updateUserState()),
      tap((data: any) => {
        console.log(`Amplify.signIn:`);
        console.log(data);
      })
    );
  }

  signUp(email: string, password: string): Observable<ISignUpResult> {
    return from(
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
    return from(Auth.confirmSignUp(email.toLocaleLowerCase(), code));
  }

  changePassword(
    user: CognitoUser,
    oldPassword: string,
    newPassword: string
  ): Observable<'SUCCESS'> {
    return from(Auth.changePassword(user, oldPassword, newPassword)).pipe(
      switchMap(() => this.updateUserState()),
      tap((data: any) => {
        console.log(`Amplify.changePassword:`);
        console.log(data);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return from(Auth.forgotPassword(email.toLocaleLowerCase()));
  }

  forgotPasswordSubmit(email: string, code: string, password: string): Observable<any> {
    return from(Auth.forgotPasswordSubmit(email.toLocaleLowerCase(), code, password));
  }

  logout(): Observable<CognitoUser | undefined> {
    return from(Auth.signOut()).pipe(
      tap(() => localStorage.clear()),
      tap(() => this.isAuthenticatedSubj.next(false)),
      tap(() => this.router.navigate(['/'])),
      switchMap(() => this.updateUserState())
    );
  }

  private updateUserState(): Observable<CognitoUser | undefined> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      catchError(() => of(undefined)),
      tap(() => console.log('updateUserState')),
      tap((user: CognitoUser | undefined) => console.log(user)),
      tap((user: CognitoUser | undefined) => this.currentUserSubj.next(user))
    );
  }
}
