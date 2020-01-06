import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewModule } from './presentations/overview/overview.module';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './presentations/overview/overview.component';
import { FeedComponent } from './presentations/feed/feed.component';
import { FeedModule } from './presentations/feed/feed.module';
import { EpisodeModule } from './presentations/episode/episode.module';
import { EpisodeComponent } from './presentations/episode/episode.component';


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
    component: EpisodeComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverviewModule,
    FeedModule,
    EpisodeModule,
    RouterModule.forChild(routes)
  ]
})
export class PodcastModule { }
