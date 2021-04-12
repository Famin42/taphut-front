import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { SigninRoutingModule } from './signin-routing.module';

import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, SigninRoutingModule, SharedlModule, ReactiveFormsModule],
})
export class SigninModule {}
