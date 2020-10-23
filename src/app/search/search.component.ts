import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map, distinctUntilChanged, tap, shareReplay, filter } from 'rxjs/operators';
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
  public searchResults$: Observable<IPodcast[] | Error> = this.route.queryParamMap.pipe(
    map(qParamMap => qParamMap.get('terms')),
    filter((terms): terms is string => !!terms),
    tap(term => this.searchForm.controls.terms.setValue(term)),
    distinctUntilChanged(),
    tap(() => this.loadingBS.next(true)),
    switchMap(searchTerms => this.searchService.appleSearch(searchTerms)),
    tap(() => this.loadingBS.next(false)),
    shareReplay()
  );

  public searchForm = this.fb.group({
    terms: ['']
  });


  private seed = [
    'My Brother My Brother and Me',
    'Wow in the World',
    'Reply All',
    'The Constant',
    'Song Exploder',
    'Radiolab',
    'HTTP 203',
    'Heavyweight',
    'the memory palace',
    'Imaginary Advice',
    'The Adventure Zone',
    'Anthropocene Reviewed',
    'Disney For Scores',
    'Blank Check'
];

  public suggestedTerms: string[] = (() => {
    const length = 5;
    // Grab from a random location and continue to the end
    const sugs = this.seed.slice(Math.random() * this.seed.length).slice(0, length);
    // Wraparound and grab from the beginning to get the desired length
    return sugs.concat(this.seed.slice(0, length - sugs.length));
  })();

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private router: Router,
    private store: StoreService,
    private route: ActivatedRoute) { }

  public search(terms: string): void {
    if (terms) {
      this.router.navigate(['/search'], { queryParams: { terms } });
    }
  }

  public viewPodcast(index: number, currentResults: IPodcast[]): void {
    const key = this.store.setPodcast(currentResults[index]);
    this.router.navigate(['podcast', 'overview', key]);
  }

  public isError(results: IPodcast[] | Error): results is Error {
    return results.constructor === Error;
  }

  public toList(results: IPodcast[] | true, search?: string): IListItem[] | undefined {
    if(results === true || search === undefined || search.length === 0) { return; }
    return results.map(
      result => ({
        title: result.name,
        image: result.thumbnail ? result.thumbnail.medium : undefined
      })
    );
  }
}
