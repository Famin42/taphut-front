import { CognitoUser } from 'amazon-cognito-identity-js';
import { Component, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CHAT_ID_KEY } from './pages/settings/telegram-dialog/telegram-dialog.component';
import { AmplifyService } from './core/services/amplify.service';
import { LoadingService } from './core/services/loading.service';
import { APP_ROUTES } from './utils/routes';
import { ROLES } from './utils/roles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isAuthenticated: Observable<boolean>;
  isAdmin: Observable<boolean>;
  isChatId: Observable<boolean>;
  loading!: boolean;

  private subscription!: Subscription;

  constructor(
    private amplify: AmplifyService,
    private router: Router,
    private loadingService: LoadingService
  ) {
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

    this.subscription = this.loadingService.loading.subscribe(
      (res: boolean) => (this.loading = res)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  title = 'taphut';

  logout(): void {
    this.amplify.logout().subscribe(() => {
      this.router.navigate([APP_ROUTES.signin]);
    });
  }
}
