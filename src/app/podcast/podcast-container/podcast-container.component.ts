import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { map, filter, shareReplay } from 'rxjs/operators';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';
import { IPodcastEpisode } from 'src/app/shared/podcast.model';
import { SubscriptionsService } from 'src/app/subscriptions/subscriptions.service';

@Component({
  selector: 'app-podcast-container',
  templateUrl: './podcast-container.component.html',
  styleUrls: ['./podcast-container.component.scss']
})
export class PodcastContainerComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private playlistService: PlaylistService,
    private subscriptionsService: SubscriptionsService
  ) {}

  public podcastKey$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('podId')),
    filter((id): id is string => id !== null),
    shareReplay()
  );

  private selectedEpisode = new Subject<string>();
  private urlParamEpisode: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('episodeId')),
    filter((id): id is string => id !== null)
  );
  public episodeKey$: Observable<string> = merge(this.selectedEpisode, this.urlParamEpisode);

  public subscribe(podcastKey: string): void {
    this.subscriptionsService.subscribe(podcastKey);
  }

  public selectEpisode(episodeKey: string): void {
    this.selectedEpisode.next(episodeKey);
  }

  public queEpisode(ep: IPodcastEpisode): void {
    this.playlistService.addToPlaylist(ep);
  }

  public playEpisode(ep: IPodcastEpisode): void {
    this.playlistService.playEpisode(ep);
  }

}
