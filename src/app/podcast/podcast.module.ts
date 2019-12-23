import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewModule } from './presentations/overview/overview.module';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './presentations/overview/overview.component';
import { FeedComponent } from './presentations/feed/feed.component';
import { FeedModule } from './presentations/feed/feed.module';


const routes: Routes = [
  {
    path: 'overview/:podId',
    component: OverviewComponent
  },
  {
    path: 'feed/:podId',
    component: FeedComponent
  },
  {
    path: 'episode/:episodeId',
    component: OverviewComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverviewModule,
    FeedModule,
    RouterModule.forChild(routes)
  ]
})
export class PodcastModule { }
