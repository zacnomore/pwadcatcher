import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, share, switchMap } from 'rxjs/operators';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { IPodcastEpisode } from 'src/app/shared/models/podcast.model';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';
import { DownloadService, DownloadProgress } from 'src/app/download/download.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent {
  downloadProgress?: Observable<DownloadProgress>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private podcastService: PodcastService,
    private playlistService: PlaylistService,
    private downloadService: DownloadService
  ) { }

  private episodeKey$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('episodeId')),
    filter((id): id is string => id !== null),
    share(),
  );

  public episode$: Observable<IPodcastEpisode | undefined> = this.episodeKey$.pipe(
    switchMap(key => this.podcastService.getEpisode(key))
  );

  public playEpisode(episode: IPodcastEpisode): void {
      this.playlistService.playEpisode(episode);
      this.router.navigate(['/player']);
  }

  public queEpisode(episode: IPodcastEpisode): void {
    this.playlistService.addToPlaylist(episode);
    this.router.navigate(['/playlist']);
  }

  public downloadEpisode(episode: IPodcastEpisode): void {
    this.downloadProgress = this.downloadService.downloadEpisode(episode);
  }
}
