import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private activateRoute: ActivatedRoute,
    private podcastService: PodcastService,
    private router: Router
  ) { }

  private activeId = '';
  private podcastKey$: Observable<string> = this.activateRoute.paramMap.pipe(
    map(params => params.get('podId')),
    filter((id): id is string => id !== null),
    share(),
    tap(id => this.activeId = id)
  );

  public overview$: Observable<IPodcast> = this.podcastKey$.pipe(
    switchMap(id => this.podcastService.getPodcast(id)),
    filter((podcast): podcast is IPodcast => podcast !== undefined));

  public details$: Observable<IPodcastFeed> = this.podcastKey$.pipe(
    mergeMap(key => this.podcastService.getFeed(key)),
    filter((podcast): podcast is IPodcastFeed => podcast !== undefined)
  );

  public viewFeed() {
    this.router.navigate(['podcast', 'feed', this.activeId]);
  }

  public subscribe() {

  }
}
