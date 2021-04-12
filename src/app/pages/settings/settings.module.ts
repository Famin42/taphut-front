import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedlModule } from 'src/app/common/modules/shared.module';

@NgModule({
  declarations: [SettingsComponent, ChangePasswordComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedlModule, ReactiveFormsModule],
})
export class SettingsModule {}
