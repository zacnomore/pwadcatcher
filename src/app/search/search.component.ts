import { Component } from '@angular/core';
import { IPodcastResult, SearchService } from './services/search.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { IListItem } from '../shared/components/podcast-list/podcast-list.component';
import { Router } from '@angular/router';
import { StoreService } from '../store/store.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchTerm = new Subject<string>();
  private currentResults: IPodcastResult[] = [];
  public searchResults$: Observable<IListItem[]> = this.searchTerm.pipe(
    distinctUntilChanged(),
    switchMap(searchTerm => this.searchService.appleSearch(searchTerm)),
    tap(results => this.currentResults = results),
    map<IPodcastResult[], IListItem[]>(results => results.map(
     result => ({
        title: result.name,
        image: result.thumbnail ? result.thumbnail.medium : undefined
      })
    ))
  );

  public searchForm = this.fb.group({
    term: ['']
  });

  constructor(private searchService: SearchService, private fb: FormBuilder, private router: Router, private store: StoreService) { }

  public search() {
    const term = this.searchForm.get('term');
    if (term && term.value) {
      this.searchTerm.next(term.value);
    }
  }

  public viewPodcast(index: number) {
    const key = this.store.addPodcast(this.currentResults[index]);
    this.router.navigate(['/podcast', key]);
  }
}
