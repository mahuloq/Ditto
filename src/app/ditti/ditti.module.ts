import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DittiRoutingModule } from './ditti-routing.module';
import { DittiComponent } from './ditti.component';


@NgModule({
  declarations: [
    DittiComponent
  ],
  imports: [
    CommonModule,
    DittiRoutingModule
  ]
})
export class DittiModule { }
