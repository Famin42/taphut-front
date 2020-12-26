import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedlModule } from 'src/app/modules';
import { ChangePasswordRoutingModule } from './change-password-routing.module';

import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SharedlModule,
    ReactiveFormsModule
  ]
})
export class ChangePasswordModule { }
