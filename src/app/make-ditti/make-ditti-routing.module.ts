import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeDittiComponent } from './make-ditti.component';

const routes: Routes = [{ path: '', component: MakeDittiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeDittiRoutingModule { }
