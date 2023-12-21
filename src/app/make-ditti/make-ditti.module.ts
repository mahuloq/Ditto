import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakeDittiRoutingModule } from './make-ditti-routing.module';
import { MakeDittiComponent } from './make-ditti.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [MakeDittiComponent],
  imports: [CommonModule, MakeDittiRoutingModule, SharedModule],
})
export class MakeDittiModule {}
