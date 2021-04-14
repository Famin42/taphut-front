import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthenticationGuard } from './core/guards/authentication.guard';
import { ChatIdGuard } from './core/guards/chat-id.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { APP_ROUTES } from './utils/routes';

const routes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    path: '',
    loadChildren: () =>
      import('./pages/apartments/apartments.module').then((m) => m.ApartmentsModule),
  },
  {
    canActivate: [AuthenticationGuard],
    path: APP_ROUTES.settings,
    loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    canActivate: [AuthenticationGuard, ChatIdGuard],
    path: APP_ROUTES.filters,
    loadChildren: () => import('./pages/filters/filters.module').then((m) => m.FiltersModule),
  },
  {
    canActivate: [AuthenticationGuard, AdminGuard],
    path: APP_ROUTES.admin,
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: APP_ROUTES.signin,
    loadChildren: () => import('./pages/signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: APP_ROUTES.signup,
    loadChildren: () => import('./pages/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: APP_ROUTES.passwordForger,
    loadChildren: () =>
      import('./pages/forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
