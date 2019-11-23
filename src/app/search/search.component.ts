import { Component, OnInit } from '@angular/core';
import { IPodcastResult, SearchService } from './services/search.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchTerm = new Subject<string>();
  public searchResults$: Observable<IPodcastResult[]> = this.searchTerm.pipe(
    switchMap(searchTerm => this.searchService.appleSearch(searchTerm))
  );

  public searchForm = this.fb.group({
    term: ['']
  });

  constructor(private searchService: SearchService, private fb: FormBuilder) { }

  search() {
    const term = this.searchForm.get('term');
    if (term && term.value) {
      this.searchTerm.next(term.value);
    }
  }
}
