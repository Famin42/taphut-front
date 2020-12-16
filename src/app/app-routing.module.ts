import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';

const routes: Routes = [
  {
    component: SigninComponent,
    path: 'auth/signin',
  },
  {
    component: SignupComponent,
    path: 'auth/signup',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
