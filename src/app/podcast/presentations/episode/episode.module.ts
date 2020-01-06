import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeComponent } from './episode.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EpisodeComponent
  ],
  exports: [
    EpisodeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EpisodeModule { }
