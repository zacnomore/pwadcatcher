import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [ControlsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule,
  ],
  exports: [
    ControlsComponent
  ]
})
export class ControlsModule { }
