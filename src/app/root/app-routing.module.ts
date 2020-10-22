import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO: Make routes navigable even when not loaded into storage
const routes: Routes = [
  {
    path: '',
    loadChildren:  () => import('../subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
    data: { animation: 0 }
  },
  {
    path: 'search',
    loadChildren:  () => import('../search/search.module').then(m => m.SearchModule),
    data: { animation: 1 }
  },
  {
    path: 'player',
    loadChildren:  () => import('../player/player.module').then(m => m.PlayerModule),
    data: { animation: 2 }
  },
  {
    path: 'playlist',
    loadChildren:  () => import('../playlist/playlist.module').then(m => m.PlaylistModule),
    data: { animation: 3 }
  },
  {
    path: 'podcast',
    loadChildren: () => import('../podcast/podcast.module').then(m => m.PodcastModule),
    data: { animation: 'podcast' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
