import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, share, switchMap, tap } from 'rxjs/operators';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { IPodcastFeed } from 'src/app/shared/models/podcast.model';
import { IListItem } from 'src/app/shared/components/podcast-list/podcast-list.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private podcastService: PodcastService,
    private router: Router
  ) { }

  private podcastKey$: Observable<string> = this.activateRoute.paramMap.pipe(
    map(params => params.get('podId')),
    filter((id): id is string => id !== null),
    share(),
  );

  public feed$: Observable<IListItem[]> = this.podcastKey$.pipe(
    switchMap(key => this.podcastService.getFeed(key)),
    tap(console.log),
    filter((feed): feed is IPodcastFeed => feed !== undefined),
    map(feed => feed.episodes.map(ep => ({
      title: ep.title,
      image: ep.image ? ep.image.small : undefined
    }))),
  );


  viewEpisode(podId: string) {
    this.router.navigate(['podcast', 'episode', podId]);
  }
}
