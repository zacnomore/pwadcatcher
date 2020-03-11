import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { ControlsModule } from '../player/controls/controls.module';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    MatSidenavModule,
    SharedModule,
    MatButtonToggleModule,
    MatListModule,
    RouterModule,
    ControlsModule,
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
