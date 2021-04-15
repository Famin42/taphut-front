import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters/filters.component';
import { FilterComponent } from './filter/filter.component';
import { FilterResolver } from './services/filter.resolver';
import { FilterService } from './services/filter.service';

const CUSTOM_MATERIALS_MODULES: any[] = [MatTableModule, MatSortModule, MatSelectModule];

@NgModule({
  declarations: [FiltersComponent, FilterComponent],
  providers: [FilterResolver, FilterService],
  imports: [
    CommonModule,
    FiltersRoutingModule,
    ReactiveFormsModule,
    SharedlModule,
    ...CUSTOM_MATERIALS_MODULES,
  ],
})
export class FiltersModule {}
