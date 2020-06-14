import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map, distinctUntilChanged, tap, shareReplay, filter, startWith } from 'rxjs/operators';
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
  private loadingBS = new BehaviorSubject(false);
  public loading$ = this.loadingBS.asObservable();
  public searchResults$: Observable<IPodcast[]> = this.route.queryParamMap.pipe(
    map(qParamMap => qParamMap.get('terms')),
    filter((terms): terms is string => !!terms),
    tap(term => this.searchForm.controls.terms.setValue(term)),
    distinctUntilChanged(),
    switchMap(searchTerms => this.searchService.appleSearch(searchTerms)),
    tap(() => this.loadingBS.next(false)),
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

  public searchForm = this.fb.group({
    terms: ['']
  });

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private router: Router,
    private store: StoreService,
    private route: ActivatedRoute) { }

  public search(): void {
    const terms = this.searchForm.get('terms');
    if (terms && terms.value) {
      this.loadingBS.next(true);
      this.router.navigate(['/search'], { queryParams: { terms: terms.value } });
    }
  }

  public viewPodcast(index: number, currentResults: IPodcast[]): void {
    const key = this.store.setPodcast(currentResults[index]);
    this.router.navigate(['podcast', 'overview', key]);
  }
}
