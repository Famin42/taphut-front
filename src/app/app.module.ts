import { NgModule } from '@angular/core';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedlModule } from './common/modules/shared.module';

import { ConfirmationDialogComponent } from './core/components/confirmation-dialog/confirmation-dialog.component';
import { AppComponent } from './app.component';

import { GraphQLModule } from './core/modules/graphql.module';
import { environment } from 'src/environments/environment';
import { clearState } from './core/store/clear-state';

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
    StoreModule.forRoot({}, { metaReducers: [clearState] }),
    EffectsModule.forRoot(),
    RecaptchaV3Module,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
