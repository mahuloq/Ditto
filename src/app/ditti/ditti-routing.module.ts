import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DittiComponent } from './ditti.component';

const routes: Routes = [
  {
    path: '',
    component: DittiComponent,
    children: [{ path: ':type', component: DittiComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DittiRoutingModule {}
