import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakeDittiRoutingModule } from './make-ditti-routing.module';
import { MakeDittiComponent } from './make-ditti.component';

@NgModule({
  declarations: [MakeDittiComponent],
  imports: [
    CommonModule,
    MakeDittiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MakeDittiModule {}
