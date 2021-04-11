import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedlModule } from './common/modules';
import { AuthenticationGuard, clearState, GraphQLModule } from './core';

import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

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
    StoreModule.forRoot(rootReducers, { metaReducers: [clearState] }),
    EffectsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [...GUARDS],
  bootstrap: [AppComponent],
})
export class AppModule {}
