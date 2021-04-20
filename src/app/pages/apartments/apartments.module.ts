import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';

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
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatSelectModule,
    EffectsModule.forFeature([ApartmentsEffect]),
  ],
})
export class ApartmentsModule {}
