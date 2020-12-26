import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from 'src/app/components/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
