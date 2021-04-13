import { CognitoUser } from 'amazon-cognito-identity-js';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { CHAT_ID_KEY } from 'src/app/pages/settings/telegram-dialog/telegram-dialog.component';
import { AmplifyService } from 'src/app/core/services/amplify.service';
import { ROUTES } from '../../utils/routes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatIdGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private amplify: AmplifyService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<true | UrlTree> {
    return this.checkAuth(route, state);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<true | UrlTree> {
    return this.checkAuth(route, state);
  }

  private checkAuth(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { queryParams }: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { url }: RouterStateSnapshot
  ): Observable<true | UrlTree> {
    return this.amplify.currentUserSubj.pipe(
      map((user: CognitoUser | undefined) => {
        const chatId = user ? (user as any).attributes[CHAT_ID_KEY] : undefined;
        const redirectToMain = ROUTES.main.split('/');
        return chatId ? true : this.router.createUrlTree(['/', ...redirectToMain]);
      })
    );
  }
}
