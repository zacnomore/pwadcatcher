import { Component } from '@angular/core';
import { IPodcastResult, SearchService } from './services/search.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, map, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { IListItem } from '../shared/components/podcast-list/podcast-list.component';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchTerm = new Subject<string>();
  public searchResults$: Observable<IListItem[]> = this.searchTerm.pipe(
    distinctUntilChanged(),
    switchMap(searchTerm => this.searchService.appleSearch(searchTerm)),
    map<IPodcastResult[], IListItem[]>(results => results.map(
     result => ({
        title: result.name,
        image: result.thumbnail ? result.thumbnail.medium : undefined,
        action: result.feedUrl
      })
    ))
  );

  public searchForm = this.fb.group({
    term: ['']
  });

  constructor(private searchService: SearchService, private fb: FormBuilder) { }

  public search() {
    const term = this.searchForm.get('term');
    if (term && term.value) {
      this.searchTerm.next(term.value);
    }
  }

  public viewPodcast(index: number) {

  }
}
