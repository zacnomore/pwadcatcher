import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { WindowComponent } from './window/window.component';
import { StatusComponent } from './status/status.component';
import { PlayerBayComponent } from './player-bay/player-bay.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls/controls.component';


const routes: Routes = [
  {
    path: '',
    component: WindowComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule,
    RouterModule.forChild(routes),
    MatSliderModule
  ],
  declarations: [
    WindowComponent,
    StatusComponent,
    PlayerBayComponent,
    ControlsComponent
  ],
  exports: [PlayerBayComponent]
})
export class PlayerModule { }
