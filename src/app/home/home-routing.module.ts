import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeaderComponent } from 'app/shared/components/header/header.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ditti/:name', component: HeaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
