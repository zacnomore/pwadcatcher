import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from 'src/app/subscriptions/subscriptions.component';
import { Routes, RouterModule } from '@angular/router';
import { PodcastListModule } from '../shared/components/podcast-list/podcast-list.module';


const routes: Routes = [
  {
    path: '',
    component: SubscriptionsComponent
  }
];

@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [
    CommonModule,
    PodcastListModule,
    RouterModule.forChild(routes)
  ]
})
export class SubscriptionsModule { }
