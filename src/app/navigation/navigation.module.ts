import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { PlayerModule } from '../player/player.module';

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
    PlayerModule,
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
