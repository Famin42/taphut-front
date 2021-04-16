import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccessHistoryComponent } from './access-history/access-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-profile',
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: 'access-history',
        component: AccessHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
