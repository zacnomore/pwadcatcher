import { NgModule } from '@angular/core';
import { PodcastListComponent } from './podcast-list.component';
import { SharedModule } from '../../shared.module';
import { MatListModule } from '@angular/material/list';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [PodcastListComponent],
  imports: [
    SharedModule,
    MatListModule,
    DragDropModule
  ],
  exports: [PodcastListComponent]
})
export class PodcastListModule { }
