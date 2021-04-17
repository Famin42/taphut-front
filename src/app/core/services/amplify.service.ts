import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

import { ROLES } from 'src/app/utils/roles';

export const CHAT_ID_KEY = 'custom:chatId';

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

  get chatId(): Observable<string | undefined> {
    // TODO: move CHAT_ID_KEY to amplify
    return this.currentUserSubj.pipe(map((user: any) => user?.attributes[CHAT_ID_KEY]));
  }
  get isAdmin(): Observable<boolean> {
    return this.currentUserSubj.pipe(
      map((user: CognitoUser | undefined) => {
        if (!user) return false;
        const groups: string[] =
          // TODO: add "cognito:groups" to KEY
          (user as any)?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];
        // TODO: add ROLES to ENUm
        return groups.includes(ROLES.admin);
      })
    );
  }

  constructor(private router: Router, private reCaptchaV3Service: ReCaptchaV3Service) {
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
    return this.reCaptchaV3Service.execute('signIn').pipe(
      switchMap((recaptchaToken: string) =>
        from(
          Auth.signIn({
            username: email.toLocaleLowerCase(),
            password,
            validationData: {
              recaptchaToken,
            },
          })
        ).pipe(
          switchMap(() => this.updateUserState()),
          tap((data: any) => {
            console.log(`Amplify.signIn:`);
            console.log(data);
          })
        )
      )
    );
  }

  signUp({ email, password }: { email: string; password: string }): Observable<ISignUpResult> {
    return this.reCaptchaV3Service.execute('signUp').pipe(
      switchMap((recaptchaToken: string) =>
        from(
          Auth.signUp({
            username: email.toLocaleLowerCase(),
            password,
            attributes: {
              email: email.toLocaleLowerCase(),
            },
            validationData: {
              recaptchaToken,
            },
          })
        )
      )
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
    return this.reCaptchaV3Service
      .execute('forgotPassword')
      .pipe(
        switchMap((recaptchaToken: string) =>
          from(Auth.forgotPassword(email.toLocaleLowerCase(), { recaptchaToken }))
        )
      );
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
