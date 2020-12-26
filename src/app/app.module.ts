import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule, SharedlModule } from './modules';

import { AuthenticationGuard } from './guards/authentication.guard';

import { AppComponent } from './app.component';
import { ShellComponent } from './components/shell/shell.component'
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { TelegramComponent } from './components/telegram/telegram.component';
import { ConfirmSignupComponent } from './components/confirm-signup/confirm-signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordSubmitComponent } from './components/forgot-password-submit/forgot-password-submit.component';


const GUARDS = [
  AuthenticationGuard
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ConfirmSignupComponent,
    ForgotPasswordComponent,
    ForgotPasswordSubmitComponent,
    ChangePasswordComponent,
    ShellComponent,
    TelegramComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    GraphQLModule,
    SharedlModule,
    InfiniteScrollModule,
  ],
  providers: [
    ...GUARDS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
