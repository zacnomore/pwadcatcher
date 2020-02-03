import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { Observable, Subject, BehaviorSubject, merge } from 'rxjs';
import { switchMap, map, distinctUntilChanged, tap, shareReplay, filter } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { IListItem } from '../shared/components/podcast-list/podcast-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../store/store.service';
import { IPodcast } from '../shared/models/podcast.model';

// TODO: Create search route
@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchTerms = new Subject<string>();
  public searchResults$: Observable<IPodcast[]> = merge(
    this.searchTerms,
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('terms')),
      filter((terms): terms is string => !!terms)
    )
  ).pipe(
    tap(console.log),
    distinctUntilChanged(),
    tap(v => this.loadingBS.next(true)),
    switchMap(searchTerms => this.searchService.appleSearch(searchTerms)),
    tap(v => this.loadingBS.next(false)),
    shareReplay()
  );
  public list$ = this.searchResults$.pipe(
    map<IPodcast[], IListItem[]>(results => results.map(
      result => ({
        title: result.name,
        image: result.thumbnail ? result.thumbnail.medium : undefined
      })
    )),
  );
  private loadingBS = new BehaviorSubject(false);
  public loading$ = this.loadingBS.asObservable();

  public searchForm = this.fb.group({
    terms: ['']
  });

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private router: Router,
    private store: StoreService,
    private route: ActivatedRoute) {}

  public search() {
    const terms = this.searchForm.get('terms');
    if (terms && terms.value) {
      this.router.navigate(['/search', terms.value]);
      this.searchTerms.next(terms.value);
    }
  }

  public viewPodcast(index: number, currentResults: IPodcast[]) {
    const key = this.store.addPodcast(currentResults[index]);
    this.router.navigate(['podcast', 'overview', key]);
  }
}
