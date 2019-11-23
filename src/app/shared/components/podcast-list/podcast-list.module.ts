import { NgModule } from '@angular/core';
import { PodcastListComponent } from './podcast-list.component';
import { SharedModule } from '../../shared.module';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [PodcastListComponent],
  imports: [
    SharedModule,
    MatListModule
  ],
  exports: [PodcastListComponent]
})
export class PodcastListModule { }
