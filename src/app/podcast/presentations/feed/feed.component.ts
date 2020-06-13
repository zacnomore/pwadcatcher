import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, share, switchMap } from 'rxjs/operators';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { IPodcastFeed, IPodcastEpisode } from 'src/app/shared/models/podcast.model';
import { IListItem } from 'src/app/shared/components/podcast-list/podcast-list.component';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private podcastService: PodcastService,
    private router: Router,
    private store: StoreService
  ) { }

  private podcastKey$: Observable<string> = this.activateRoute.paramMap.pipe(
    map(params => params.get('podId')),
    filter((id): id is string => id !== null),
    share(),
  );

  private feed$: Observable<IPodcastFeed> = this.podcastKey$.pipe(
    switchMap(key => this.podcastService.getFeed(key)),
    filter((feed): feed is IPodcastFeed => feed !== undefined),
    share()
  );

  public listItems$: Observable<IFeedItem[]> = this.feed$.pipe(
    map(feed => feed.episodes.map((ep, index) => {
      const enhancedEp: IPodcastEpisode = {
        ...ep,
        title: ep.title || `Episode ${index + 1}`,
        thumbnail: ep.thumbnail || feed.defaultImage
      };
      const item: IFeedItem = {
        title: enhancedEp.title,
        image: enhancedEp.thumbnail?.small,
        episodeKey: this.store.addEpisode(enhancedEp)
      };
      return item;
    }))
  );


  viewEpisode(feed: IFeedItem[], index: number): void {
    this.router.navigate(['podcast', 'episode', feed[index].episodeKey]);
  }
}

interface IFeedItem extends IListItem {
  episodeKey: string | undefined;
}
