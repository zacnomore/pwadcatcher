import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastComponent } from './podcast.component';
import { OverviewModule } from './presentations/overview/overview.module';



@NgModule({
  declarations: [PodcastComponent],
  imports: [
    CommonModule,
    OverviewModule
  ]
})
export class PodcastModule { }
