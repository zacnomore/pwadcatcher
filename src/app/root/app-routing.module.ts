import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren:  () => import('../subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)},
  { path: 'player', loadChildren:  () => import('../player/player.module').then(m => m.PlayerModule) },
  { path: 'search', loadChildren:  () => import('../search/search.module').then(m => m.SearchModule)},
  { path: 'podcast', loadChildren:  () => import('../podcast/podcast.module').then(m => m.PodcastModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
