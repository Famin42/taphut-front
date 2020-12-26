import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { ForgotPasswordSubmitComponent } from 'src/app/components/forgot-password-submit/forgot-password-submit.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  },
  {
    path: 'confirm',
    component: ForgotPasswordSubmitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule { }
