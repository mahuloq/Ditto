import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DittiRoutingModule } from './ditti-routing.module';
import { DittiComponent } from './ditti.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DittiComponent],
  imports: [CommonModule, DittiRoutingModule, SharedModule],
})
export class DittiModule {}
