import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls.component';
import {MatSliderModule} from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ControlsComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ControlsComponent
  ]
})
export class ControlsModule { }
