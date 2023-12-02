import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login-form/login.module').then((m) => m.LoginModule
    ),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'ditti',
    loadChildren: () =>
      import('./ditti/ditti.module').then((m) => m.DittiModule),
  },
  {
    path: 'make-ditti',
    loadChildren: () =>
      import('./make-ditti/make-ditti.module').then((m) => m.MakeDittiModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
