import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DittiComponent } from './ditti.component';
import { DittiHomeComponent } from './pages/ditti-home/ditti-home.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewPostsComponent } from './pages/view-posts/view-posts.component';

const routes: Routes = [
  {
    path: '',
    component: DittiComponent,
    children: [
      { path: ':type', component: DittiHomeComponent },
      { path: ':type/createPost', component: CreatePostComponent },
      {
        path: ':type/comments/:uniqueID/:title',
        component: ViewPostsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DittiRoutingModule {}
