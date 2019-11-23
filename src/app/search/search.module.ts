import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { PodcastListModule } from '../shared/components/podcast-list/podcast-list.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule,
    PodcastListModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class SearchModule { }
