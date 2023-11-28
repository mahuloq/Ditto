import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeDittiRoutingModule } from './make-ditti-routing.module';
import { MakeDittiComponent } from './make-ditti.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MakeDittiComponent],
  imports: [CommonModule, MakeDittiRoutingModule, SharedModule],
})
export class MakeDittiModule {}
