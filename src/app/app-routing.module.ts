import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthenticationGuard } from './core/guards/authentication.guard';

const routes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    path: '',
    loadChildren: () =>
      import('./pages/apartments/apartments.module').then((m) => m.ApartmentsModule),
  },
  {
    canActivate: [AuthenticationGuard],
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'auth/signin',
    loadChildren: () => import('./pages/signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: 'auth/signup',
    loadChildren: () => import('./pages/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'auth/password/forget',
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
