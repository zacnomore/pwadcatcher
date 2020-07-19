import { NgModule } from '@angular/core';
import { PodcastListComponent } from './podcast-list.component';
import { MatListModule } from '@angular/material/list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [PodcastListComponent],
  imports: [
    MatListModule,
    DragDropModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [PodcastListComponent]
})
export class PodcastListModule { }
