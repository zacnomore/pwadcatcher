import { Component, OnInit } from '@angular/core';
import { SearchService, IPodcastResult } from './services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent {
  public searchResults$: Observable<IPodcastResult[]> = this.search.appleSearch('brother');

  constructor(private search: SearchService) { }

}
