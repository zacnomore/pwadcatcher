import { NgModule } from '@angular/core';
import { PlayerComponent } from './player.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    SharedModule,
    MatProgressBarModule
  ]
})
export class PlayerModule { }
