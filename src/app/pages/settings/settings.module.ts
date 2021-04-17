import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChangePasswordComponent } from './user-profile/change-password/change-password.component';
import { TelegramDialogComponent } from './user-profile/telegram-dialog/telegram-dialog.component';
import { SharedlModule } from 'src/app/common/modules/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { TelegramComponent } from './user-profile/telegram/telegram.component';
import { SettingsComponent } from './settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccessHistoryComponent } from './access-history/access-history.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    TelegramComponent,
    TelegramDialogComponent,
    UserProfileComponent,
    AccessHistoryComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedlModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
})
export class SettingsModule {}
