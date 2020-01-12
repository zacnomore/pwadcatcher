import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from 'src/app/subscriptions/subscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';
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
    SharedModule,
    PodcastListModule,
    RouterModule.forChild(routes)
  ]
})
export class SubscriptionsModule { }
