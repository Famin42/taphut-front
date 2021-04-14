import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters/filters.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [FiltersComponent, FilterComponent],
  imports: [CommonModule, FiltersRoutingModule, SharedlModule, MatTableModule, MatSortModule],
})
export class FiltersModule {}
