import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OverviewModule } from './overview/overview.module';
import { FeedModule } from './feed/feed.module';
import { EpisodeModule } from './episode/episode.module';
import { PodcastContainerComponent } from './podcast-container/podcast-container.component';


const routes: Routes = [
  {
    path: 'overview/:podId',
    component: PodcastContainerComponent,
    data: {
      viewLevel: 'overview'
    }
  },
  {
    path: 'feed/:podId',
    component: PodcastContainerComponent,
    data: {
      viewLevel: 'feed'
    }
  },
  {
    path: 'episode/:episodeId',
    component: PodcastContainerComponent,
    data: {
      viewLevel: 'episode'
    }
  }
];


@NgModule({
  declarations: [
    PodcastContainerComponent
  ],
  imports: [
    CommonModule,
    OverviewModule,
    FeedModule,
    EpisodeModule,
    RouterModule.forChild(routes)
  ]
})
export class PodcastModule { }
