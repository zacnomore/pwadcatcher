import { Injectable } from '@angular/core';
import { IPodcast, IPodcastFeed, IPodcastEpisode } from '../models/podcast.model';
import { StoreService } from 'src/app/store/store.service';
import { of, Observable, from } from 'rxjs';
import { RssReaderService } from './rss-reader.service';
import { tap, switchMap } from 'rxjs/operators';
import { SearchService } from 'src/app/search/services/search.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  constructor(private store: StoreService, private rss: RssReaderService, private searchService: SearchService) {}

  // TODO: Setup differentiated key types for each store
  public async getEpisode(key: string): Promise<IPodcastEpisode | undefined> {
    return this.store.getEpisode(key);
  }

  public async getPodcast(key: string): Promise<IPodcast | undefined> {
    return from(this.store.getPodcast(key)).pipe(
      switchMap(resultFromStore => {
        if(resultFromStore) {
          return of(resultFromStore);
        } else {
          return this.searchService.findPodcast(key);
        }
      })
    ).toPromise();
  }

  public getFeed(key: string): Observable<IPodcastFeed | undefined> {
    return from(this.store.getPodcast(key)).pipe(
      switchMap(podcast => {
        if (podcast) {
          if (podcast.feed) {
            return of(podcast.feed);
          }
          return this.rss.readFeed(podcast.feedUrl).pipe(
            tap(feed => this.store.setPodcast({ ...podcast, feed }))
          );
        }
        return of(undefined);
      })
    );
  }
}
