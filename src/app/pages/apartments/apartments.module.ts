import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { ApartmentsRoutingModule } from './apartments-routing.module';

import { ApartmentsService } from './apartments.service';

import { ApartmentsComponent } from './apartments/apartments.component';
import { ApartmentsEffect } from './store/effects/apartments.effects';

@NgModule({
  declarations: [ApartmentsComponent],
  providers: [ApartmentsService],
  imports: [
    CommonModule,
    ApartmentsRoutingModule,
    SharedlModule,
    InfiniteScrollModule,
    EffectsModule.forFeature([ApartmentsEffect]),
  ],
})
export class ApartmentsModule {}
