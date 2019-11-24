import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastComponent } from './podcast.component';
import { OverviewModule } from './presentations/overview/overview.module';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PodcastComponent
  }
];


@NgModule({
  declarations: [PodcastComponent],
  imports: [
    CommonModule,
    OverviewModule,
    RouterModule.forChild(routes)
  ]
})
export class PodcastModule { }
