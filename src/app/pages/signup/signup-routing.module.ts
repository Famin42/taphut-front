import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmSignupComponent } from 'src/app/components/confirm-signup/confirm-signup.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },
  {
    path: 'confirm',
    component: ConfirmSignupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
