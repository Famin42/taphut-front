import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { SignupRoutingModule } from './signup-routing.module';

import { SignupComponent } from './signup/signup.component';
import { ConfirmSignupComponent } from './confirm-signup/confirm-signup.component';

@NgModule({
  declarations: [SignupComponent, ConfirmSignupComponent],
  imports: [CommonModule, SignupRoutingModule, SharedlModule, ReactiveFormsModule],
})
export class SignupModule {}
