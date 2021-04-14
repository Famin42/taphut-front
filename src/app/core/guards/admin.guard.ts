import { CognitoUser } from 'amazon-cognito-identity-js';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AmplifyService } from 'src/app/core/services/amplify.service';
import { APP_ROUTES } from '../../utils/routes';
import { ROLES } from 'src/app/utils/roles';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private amplify: AmplifyService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    return await this.checkAuth(route, state);
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    return await this.checkAuth(route, state);
  }

  // TODO: update check auth
  private async checkAuth(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { queryParams }: ActivatedRouteSnapshot,
    { url }: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    const user: CognitoUser | undefined = await this.amplify.isAuthenticated;
    const groups: string[] =
      (user as any)?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];
    if (groups.includes(ROLES.admin)) {
      return true;
    }

    if (url.split('?').length) {
      url = url.split('?')[0];
    }

    const redirectTo = APP_ROUTES.main.split('/');

    return this.router.createUrlTree(['/', ...redirectTo]);
  }
}
