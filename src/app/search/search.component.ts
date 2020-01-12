import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, map, distinctUntilChanged, tap, startWith } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { IListItem } from '../shared/components/podcast-list/podcast-list.component';
import { Router } from '@angular/router';
import { StoreService } from '../store/store.service';
import { IPodcast } from '../shared/models/podcast.model';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchTerm = new Subject<string>();
  public searchResults$: Observable<IListItem[]> = this.searchTerm.pipe(
    distinctUntilChanged(),
    tap(v => this.loadingBS.next(true)),
    switchMap(searchTerm => this.searchService.appleSearch(searchTerm)),
    map<IPodcast[], IListItem[]>(results => results.map(
     result => ({
        title: result.name,
        image: result.thumbnail ? result.thumbnail.medium : undefined
      })
    )),
    tap(v => this.loadingBS.next(false))
  );
  private loadingBS = new BehaviorSubject(false);
  public loading$ = this.loadingBS.asObservable();

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

  public viewPodcast(index: number, currentResults: IPodcast[]) {
    const key = this.store.addPodcast(currentResults[index]);
    this.router.navigate(['podcast', 'overview', key]);
  }
}
