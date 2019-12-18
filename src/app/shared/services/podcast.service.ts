import { Injectable } from '@angular/core';
import { IPodcast, IInitializedPodcast, IPodcastFeed } from '../models/podcast.model';
import { StoreService } from 'src/app/store/store.service';
import { of, Observable } from 'rxjs';
import { RssReaderService } from './rss-reader.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  constructor(private store: StoreService, private rss: RssReaderService) {}

  getPodcast(key: string): IPodcast | undefined {
    return this.store.getPodcast(key);
  }

  getFeed(key: string): Observable<IPodcastFeed | undefined> {
    const local = this.store.getPodcast(key);
    console.log(local);
    if (local) {
      if (local.feed !== undefined) {
        return of((local as IInitializedPodcast).feed);
      } else {
        return this.rss.readFeed(local.feedUrl);
      }
    }
    return of(undefined);
  }
}
