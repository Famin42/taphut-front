import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, SharedlModule],
})
export class AdminModule {}
