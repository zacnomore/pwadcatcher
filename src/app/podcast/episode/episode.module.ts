import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeComponent } from './episode.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    EpisodeComponent
  ],
  exports: [
    EpisodeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class EpisodeModule { }
