import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { FeedComponent } from './feed/feed.component';
import { EpisodeComponent } from './episode/episode.component';
import { OverviewModule } from './overview/overview.module';
import { FeedModule } from './feed/feed.module';
import { EpisodeModule } from './episode/episode.module';


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
