import { Component, OnInit } from '@angular/core';
import { RssReaderService } from '../services/rss-reader.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  feed$ = this.reader.readFeed('https://feeds.megaphone.fm/replyall').pipe(map(val => JSON.stringify(val)));
  constructor(private reader: RssReaderService) { }

  ngOnInit() {
  }

}
