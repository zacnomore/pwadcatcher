import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { PodcastListModule } from '../../../shared/components/podcast-list/podcast-list.module';



@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    PodcastListModule
  ]
})
export class FeedModule { }
