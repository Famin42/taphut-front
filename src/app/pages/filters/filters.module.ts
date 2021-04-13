import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, FiltersRoutingModule, SharedlModule],
})
export class FiltersModule {}
