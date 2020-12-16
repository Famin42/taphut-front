import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {ConfirmSignupComponent} from './components/confirm-signup/confirm-signup.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ForgotPasswordSubmitComponent} from './components/forgot-password-submit/forgot-password-submit.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';

const routes: Routes = [
  {
    component: SigninComponent,
    path: 'auth/signin',
  },
  {
    component: SignupComponent,
    path: 'auth/signup',
  },
  // {
  //   component: ConfirmSignupComponent,
  //   path: 'auth/signup/confirm',
  // },
  // {
  //   component: ForgotPasswordComponent,
  //   path: 'auth/password/forger',
  // },
  // {
  //   component: ForgotPasswordSubmitComponent,
  //   path: 'auth/password/forger/confirm',
  // },
  // {
  //   component: ChangePasswordComponent,
  //   path: 'auth/password/change',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
