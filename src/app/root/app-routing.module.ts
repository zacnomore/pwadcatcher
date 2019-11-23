import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';
import { SearchComponent } from '../search/search.component';


const routes: Routes = [
  { path: '', component: SubscriptionsComponent},
  { path: 'player', component: PlayerComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
