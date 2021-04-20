import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { ApartmentsRoutingModule } from './apartments-routing.module';

import { ApartmentsComponent } from './apartments/apartments.component';

@NgModule({
  declarations: [ApartmentsComponent],
  imports: [
    CommonModule,
    ApartmentsRoutingModule,
    SharedlModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatSelectModule,
  ],
})
export class ApartmentsModule {}
