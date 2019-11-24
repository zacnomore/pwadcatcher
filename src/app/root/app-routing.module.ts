import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';
import { SearchComponent } from '../search/search.component';
import { PodcastComponent } from '../podcast/podcast.component';


const routes: Routes = [
  { path: '', component: SubscriptionsComponent},
  { path: 'player', component: PlayerComponent },
  { path: 'search', component: SearchComponent },
  { path: 'podcast', component: PodcastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
