import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedlModule } from 'src/app/modules';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';

import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { ForgotPasswordSubmitComponent } from '../../components/forgot-password-submit/forgot-password-submit.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    ForgotPasswordSubmitComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    SharedlModule,
    ReactiveFormsModule
  ]
})
export class ForgetPasswordModule { }
