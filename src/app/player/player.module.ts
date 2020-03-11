import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { WindowComponent } from './window/window.component';


const routes: Routes = [
  {
    path: '',
    component: WindowComponent
  }
];
@NgModule({
  declarations: [
    WindowComponent
  ],
  imports: [
    SharedModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ]
})
export class PlayerModule { }
