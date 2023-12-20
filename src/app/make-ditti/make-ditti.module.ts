import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeDittiRoutingModule } from './make-ditti-routing.module';
import { MakeDittiComponent } from './make-ditti.component';


@NgModule({
  declarations: [
    MakeDittiComponent
  ],
  imports: [
    CommonModule,
    MakeDittiRoutingModule
  ]
})
export class MakeDittiModule { }
