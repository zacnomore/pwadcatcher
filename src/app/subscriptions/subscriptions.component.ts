import { Component, OnInit } from '@angular/core';
import { RssReaderService } from '../services/rss-reader.service';
import { map, tap } from 'rxjs/operators';
import { SearchService, IPodcastResult } from './services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  public feed$: Observable<IPodcastResult[]> = this.search.appleSearch('brother');

  constructor(private search: SearchService) { }
  ngOnInit() {
  }

}
