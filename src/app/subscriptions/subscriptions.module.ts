import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from 'src/app/subscriptions/subscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SubscriptionsModule { }
