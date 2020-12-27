import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartmentsComponent } from './apartments/apartments.component';

const routes: Routes = [
  {
    path: '',
    component: ApartmentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentsRoutingModule {}
