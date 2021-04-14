import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters/filters.component';
import { FilterComponent } from './filter/filter.component';
import { FilterResolver } from './filter.resolver';

@NgModule({
  declarations: [FiltersComponent, FilterComponent],
  providers: [FilterResolver],
  imports: [
    CommonModule,
    FiltersRoutingModule,
    ReactiveFormsModule,
    SharedlModule,
    MatTableModule,
    MatSortModule,
  ],
})
export class FiltersModule {}
