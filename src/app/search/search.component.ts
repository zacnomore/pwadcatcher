import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map, distinctUntilChanged, tap, shareReplay, filter, startWith } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { IListItem } from '../shared/components/podcast-list/podcast-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../store/store.service';
import { IPodcast } from '../shared/podcast.model';

// TODO: Create search route
@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private loadingBS = new BehaviorSubject(false);
  public loading$ = this.loadingBS.asObservable();
  public searchResults$: Observable<IPodcast[] | boolean> = this.route.queryParamMap.pipe(
    map(qParamMap => qParamMap.get('terms')),
    filter((terms): terms is string => !!terms),
    tap(term => this.searchForm.controls.terms.setValue(term)),
    distinctUntilChanged(),
    switchMap(searchTerms => this.searchService.appleSearch(searchTerms)),
    // True is a truthy value that clearly shouldn't be evalutated as a list.
    // We want the nested spinner to be subscribed
    // Would you rather manage the subscription or have this strangeness?
    startWith(true),
    tap(() => this.loadingBS.next(false)),
    shareReplay()
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

  toList(results: IPodcast[] | true, search?: string): IListItem[] | undefined {
    if(results === true || search === undefined || search.length === 0) { return; }
    return results.map(
      result => ({
        title: result.name,
        image: result.thumbnail ? result.thumbnail.medium : undefined
      })
    );
  }
}
