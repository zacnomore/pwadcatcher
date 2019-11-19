import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from 'src/app/subscriptions/subscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatGridListModule
  ]
})
export class SubscriptionsModule { }
