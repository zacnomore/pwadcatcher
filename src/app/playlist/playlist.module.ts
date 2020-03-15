import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { Routes, RouterModule } from '@angular/router';
import { PodcastListModule } from '../shared/components/podcast-list/podcast-list.module';


const routes: Routes = [
  { path: '**', component: PlaylistComponent }
];

@NgModule({
  declarations: [PlaylistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PodcastListModule
  ]
})
export class PlaylistModule { }
