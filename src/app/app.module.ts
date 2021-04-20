import { NgModule } from '@angular/core';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedlModule } from './common/modules/shared.module';

import { ConfirmationDialogComponent } from './core/components/confirmation-dialog/confirmation-dialog.component';
import { AppComponent } from './app.component';

import { GraphQLModule } from './core/modules/graphql.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, ConfirmationDialogComponent],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaV3SiteKey }],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    SharedlModule,
    RecaptchaV3Module,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
