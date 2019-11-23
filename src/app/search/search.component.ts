import { Component, OnInit } from '@angular/core';
import { IPodcastResult, SearchService } from './services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchResults$: Observable<IPodcastResult[]> = this.search.appleSearch('brother');

  constructor(private search: SearchService) { }
  ngOnInit() {
  }

}
