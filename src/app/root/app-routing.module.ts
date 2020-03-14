import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO: Make routes navigable even when not loaded into storage
const routes: Routes = [
  { path: '', loadChildren:  () => import('../subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)},
  { path: 'player', loadChildren:  () => import('../player/player.module').then(m => m.PlayerModule) },
  { path: 'search', loadChildren:  () => import('../search/search.module').then(m => m.SearchModule)},
  { path: 'podcast', loadChildren: () => import('../podcast/podcast.module').then(m => m.PodcastModule) },
  { path: 'playlist', loadChildren:  () => import('../playlist/playlist.module').then(m => m.PlaylistModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
