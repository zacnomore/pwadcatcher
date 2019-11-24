import { NgModule } from '@angular/core';
import { PlayerComponent } from './player.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PlayerComponent
  }
];
@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    SharedModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ]
})
export class PlayerModule { }
