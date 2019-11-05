import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    MatSidenavModule,
    SharedModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
