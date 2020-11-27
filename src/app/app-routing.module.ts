import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DumpComponent } from './dump/dump.component';

const routes: Routes = [
  {
    component: DumpComponent,
    path: '**',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
