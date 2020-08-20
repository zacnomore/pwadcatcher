import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { PodcastListModule } from '../shared/components/podcast-list/podcast-list.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


const routes: Routes = [
  { path: '**', component: SearchComponent }
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    PodcastListModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule { }
