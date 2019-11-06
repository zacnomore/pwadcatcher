import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule
  ]
})
export class PlayerModule { }
