import { CognitoUser } from 'amazon-cognito-identity-js';
import { map, switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CHAT_ID_KEY } from './pages/settings/telegram-dialog/telegram-dialog.component';
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
  isChatId: Observable<boolean>;

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
    this.isChatId = this.amplify.currentUserSubj.pipe(
      map((user: any) => (user?.attributes ? user?.attributes[CHAT_ID_KEY] : false))
    );
  }

  title = 'taphut';

  logout(): void {
    this.amplify.logout().subscribe(() => {
      this.router.navigate([ROUTES.signin]);
    });
  }
}
