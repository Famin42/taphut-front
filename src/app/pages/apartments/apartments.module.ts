import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedlModule } from 'src/app/modules';
import { ApartmentsRoutingModule } from './apartments-routing.module';

import { ShellComponent } from './shell/shell.component';
import { TelegramComponent } from './telegram/telegram.component';


@NgModule({
  declarations: [
    ShellComponent,
    TelegramComponent
  ],
  imports: [
    CommonModule,
    ApartmentsRoutingModule,
    SharedlModule,
    InfiniteScrollModule
  ]
})
export class ApartmentsModule { }
