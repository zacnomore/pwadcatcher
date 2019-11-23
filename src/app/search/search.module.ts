import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { PodcastListModule } from '../shared/components/podcast-list/podcast-list.module';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule,
    PodcastListModule
  ]
})
export class SearchModule { }
