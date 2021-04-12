import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedlModule } from './common/modules/shared.module';

import { AppComponent } from './app.component';

import { AuthenticationGuard } from './core/guards/authentication.guard';
import { GraphQLModule } from './core/modules/graphql.module';
import { environment } from 'src/environments/environment';
import { clearState } from './core/store/clear-state';

const GUARDS = [AuthenticationGuard];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    SharedlModule,
    StoreModule.forRoot({}, { metaReducers: [clearState] }),
    EffectsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [...GUARDS],
  bootstrap: [AppComponent],
})
export class AppModule {}
