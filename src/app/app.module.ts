import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ConfirmSignupComponent } from './components/confirm-signup/confirm-signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordSubmitComponent } from './components/forgot-password-submit/forgot-password-submit.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ConfirmSignupComponent,
    ForgotPasswordComponent,
    ForgotPasswordSubmitComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    MatButtonModule,
    AmplifyUIAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
