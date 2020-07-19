import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, share, switchMap } from 'rxjs/operators';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { IPodcastEpisode } from 'src/app/shared/models/podcast.model';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private podcastService: PodcastService,
    private playlistService: PlaylistService
  ) { }

  private episodeKey$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('episodeId')),
    filter((id): id is string => id !== null),
    share(),
  );

  public episode$: Observable<IPodcastEpisode | undefined> = this.episodeKey$.pipe(
    switchMap(key => this.podcastService.getEpisode(key))
  );

  playEpisode(episode: IPodcastEpisode): void {
      this.playlistService.playEpisode(episode);
      this.router.navigate(['/player']);
  }

  queEpisode(episode: IPodcastEpisode): void {
    this.playlistService.addToPlaylist(episode);
    this.router.navigate(['/playlist']);
  }
}
