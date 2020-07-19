import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [OverviewComponent]
})
export class OverviewModule { }
