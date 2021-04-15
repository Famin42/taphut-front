import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FiltersComponent } from './filters/filters.component';
import { FilterComponent } from './filter/filter.component';
import { FilterResolver } from './services/filter.resolver';

const routes: Routes = [
  {
    path: '',
    component: FiltersComponent,
  },
  {
    path: 'create',
    component: FilterComponent,
    data: { mode: FilterPageMode.CREATE },
  },
  {
    path: 'edit/:id',
    component: FilterComponent,
    data: { mode: FilterPageMode.EDIT },
    resolve: { filter: FilterResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersRoutingModule {}
