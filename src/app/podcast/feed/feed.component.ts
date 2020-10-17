import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, share, switchMap } from 'rxjs/operators';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { IPodcastFeed, IPodcastEpisode } from 'src/app/shared/podcast.model';
import { IListItem } from 'src/app/shared/components/podcast-list/podcast-list.component';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  constructor(
    private podcastService: PodcastService,
    private store: StoreService
  ) { }

  @Output() viewEpisode = new EventEmitter<string>();

  private _podcastKey$ = new BehaviorSubject<string>('');
  @Input()
  public set podcastKey(value: string) {
    this._podcastKey$.next(value);
  }


  private feed$: Observable<IPodcastFeed> = this._podcastKey$.pipe(
    switchMap(key => this.podcastService.getFeed(key)),
    filter((feed): feed is IPodcastFeed => feed !== undefined),
    share()
  );

  // TODO: Refactor this side-effect to happen somewhere more efficient
  public listItems$: Observable<IFeedItem[]> = this.feed$.pipe(
    map(feed => feed.episodes.map((ep, index) => {
      const enhancedEp: IPodcastEpisode = {
        ...ep,
        title: ep.title || `Episode ${index + 1}`,
        // TODO: The episode image url is so expensive! Maybe we can figure something out for a lazy load enhancement?
        // ep.thumbnail
        thumbnail: feed.defaultImage
      };
      const item: IFeedItem = {
        title: enhancedEp.title,
        image: enhancedEp.thumbnail?.small,
        episodeKey: this.store.setEpisode(enhancedEp)
      };
      return item;
    }))
  );

}

interface IFeedItem extends IListItem {
  episodeKey: string | undefined;
}
