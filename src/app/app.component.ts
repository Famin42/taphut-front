import { CognitoUser } from 'amazon-cognito-identity-js';
import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AmplifyService } from './core/services/amplify.service';
import { ROUTES } from './utils/routes';
import { ROLES } from './utils/roles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated: Observable<boolean>;
  isAdmin: Observable<boolean>;
  constructor(private amplify: AmplifyService, private router: Router) {
    this.isAuthenticated = this.amplify.isAuthenticatedSubj;
    this.isAdmin = this.amplify.currentUserSubj.pipe(
      switchMap((user: CognitoUser | undefined) => {
        if (!user) return of(false);
        const groups: string[] =
          (user as any)?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];
        return of(groups.includes(ROLES.admin));
      })
    );
  }

  title = 'taphut';

  logout(): void {
    this.amplify.logout().subscribe(() => {
      this.router.navigate([ROUTES.signin]);
    });
  }
}
