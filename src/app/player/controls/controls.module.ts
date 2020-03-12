import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [ControlsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatSliderModule
  ],
  exports: [
    ControlsComponent
  ]
})
export class ControlsModule { }
