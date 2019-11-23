import { NgModule } from '@angular/core';
import { PodcastListComponent } from './podcast-list.component';
import { SharedModule } from '../../shared.module';



@NgModule({
  declarations: [PodcastListComponent],
  imports: [
    SharedModule
  ],
  exports: [PodcastListComponent]
})
export class PodcastListModule { }
