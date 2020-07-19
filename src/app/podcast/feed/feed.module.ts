import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PodcastListModule } from 'src/app/shared/components/podcast-list/podcast-list.module';



@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    PodcastListModule,
    MatProgressSpinnerModule
  ]
})
export class FeedModule { }
