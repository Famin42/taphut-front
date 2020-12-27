import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AmplifyService } from '../services/amplify.service';
import { ROUTES } from '../../utils/routes';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {
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

  private async checkAuth(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { queryParams }: ActivatedRouteSnapshot,
    { url }: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    if (await this.amplify.isAuthenticated) {
      return true;
    }

    if (url.split('?').length) {
      url = url.split('?')[0];
    }

    const redirectTo = ROUTES.signin.split('/');

    return this.router.createUrlTree(['/', ...redirectTo]);
  }
}
