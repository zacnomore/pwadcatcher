import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewModule } from './presentations/overview/overview.module';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './presentations/overview/overview.component';


const routes: Routes = [
  {
    path: ':id',
    component: OverviewComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverviewModule,
    RouterModule.forChild(routes)
  ]
})
export class PodcastModule { }
