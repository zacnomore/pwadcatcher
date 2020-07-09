import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeComponent } from './episode.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    EpisodeComponent
  ],
  exports: [
    EpisodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule
  ]
})
export class EpisodeModule { }
