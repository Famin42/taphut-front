import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedlModule } from 'src/app/common/modules';
import { ApartmentsRoutingModule } from './apartments-routing.module';

import { ApartmentsService } from './apartments.service';

import { ApartmentsComponent } from './apartments/apartments.component';
import { TelegramComponent } from './telegram/telegram.component';


@NgModule({
  declarations: [
    ApartmentsComponent,
    TelegramComponent
  ],
  providers: [
    ApartmentsService
  ],
  imports: [
    CommonModule,
    ApartmentsRoutingModule,
    SharedlModule,
    InfiniteScrollModule
  ]
})
export class ApartmentsModule { }
