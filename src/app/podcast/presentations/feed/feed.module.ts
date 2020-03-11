import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { PodcastListModule } from '../../../shared/components/podcast-list/podcast-list.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    PodcastListModule,
    MatProgressSpinnerModule
  ]
})
export class FeedModule { }
