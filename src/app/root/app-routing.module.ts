import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';


const routes: Routes = [
  { path: '', component: SubscriptionsComponent},
  { path: 'player', component: PlayerComponent },
  { path: 'playlist', component: PlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
