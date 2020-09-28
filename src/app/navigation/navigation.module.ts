import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { ControlsModule } from '../player/controls/controls.module';
import { MenuComponent } from './menu/menu.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    NavigationComponent,
    MenuComponent
  ],
  imports: [
    MatSidenavModule,
    MatButtonToggleModule,
    MatListModule,
    RouterModule,
    ControlsModule,
    MatIconModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
