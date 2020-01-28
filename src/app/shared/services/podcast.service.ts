import { Injectable } from '@angular/core';
import { IPodcast, IInitializedPodcast, IPodcastFeed } from '../models/podcast.model';
import { StoreService } from 'src/app/store/store.service';
import { of, Observable, from, combineLatest } from 'rxjs';
import { RssReaderService } from './rss-reader.service';
import { tap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  constructor(private store: StoreService, private rss: RssReaderService) {}

  // TODO: Setup differentiated key types for each store
  public async getEpisode(key: string) {
    return this.store.getEpisode(key);
  }

  public async getPodcast(key: string): Promise<IPodcast | undefined> {
    return this.store.getPodcast(key);
  }

  public getFeed(key: string): Observable<IPodcastFeed | undefined> {
    return from(this.store.getPodcast(key)).pipe(
      switchMap(podcast => {
        if (podcast) {
          if (podcast.feed) {
            return of(podcast.feed);
          }
          return this.rss.readFeed(podcast.feedUrl).pipe(
            tap(feed => this.store.addPodcast({...podcast, feed}))
          );
        }
        return of(undefined);
      })
    );
  }
}
