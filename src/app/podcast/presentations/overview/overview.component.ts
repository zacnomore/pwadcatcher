import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, share, tap, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPodcast, IPodcastFeed } from 'src/app/shared/models/podcast.model';
import { PodcastService } from 'src/app/shared/services/podcast.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  constructor(private activateRoute: ActivatedRoute, private podcastService: PodcastService) { }

  podcastKey$: Observable<string> = this.activateRoute.paramMap.pipe(
    map(params => params.get('id')),
    filter((id): id is string => id !== null),
    share(),
  );

  overview$: Observable<IPodcast> = this.podcastKey$.pipe(
    switchMap(id => this.podcastService.getPodcast(id)),
    filter((podcast): podcast is IPodcast => podcast !== undefined));

  details$: Observable<IPodcastFeed> = this.podcastKey$.pipe(
    mergeMap(key => this.podcastService.getFeed(key)),
    tap(console.log)
  );
}
