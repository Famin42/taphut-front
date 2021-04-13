import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthenticationGuard } from './core/guards/authentication.guard';
import { ChatIdGuard } from './core/guards/chat-id.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { ROUTES } from './utils/routes';

const routes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    path: '',
    loadChildren: () =>
      import('./pages/apartments/apartments.module').then((m) => m.ApartmentsModule),
  },
  {
    canActivate: [AuthenticationGuard],
    path: ROUTES.settings,
    loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    canActivate: [AuthenticationGuard, ChatIdGuard],
    path: ROUTES.filters,
    loadChildren: () => import('./pages/filters/filters.module').then((m) => m.FiltersModule),
  },
  {
    canActivate: [AuthenticationGuard, AdminGuard],
    path: ROUTES.admin,
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: ROUTES.signin,
    loadChildren: () => import('./pages/signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: ROUTES.signup,
    loadChildren: () => import('./pages/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: ROUTES.passwordForger,
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
