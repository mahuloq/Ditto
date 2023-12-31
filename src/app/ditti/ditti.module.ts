import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DittiRoutingModule } from './ditti-routing.module';
import { DittiComponent } from './ditti.component';
import { SharedModule } from '../shared/shared.module';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewPostsComponent } from './pages/view-posts/view-posts.component';
import { DittiHomeComponent } from './pages/ditti-home/ditti-home.component';

@NgModule({
  declarations: [DittiComponent, CreatePostComponent, ViewPostsComponent, DittiHomeComponent],
  imports: [CommonModule, DittiRoutingModule, SharedModule],

})
export class DittiModule { }
