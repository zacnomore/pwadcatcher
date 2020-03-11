import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, share, switchMap, tap } from 'rxjs/operators';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { AudioPlayerService } from 'src/app/player/services/audio-player.service';
import { IPodcastEpisode } from 'src/app/shared/models/podcast.model';

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
    private audioService: AudioPlayerService
  ) { }

  private episodeKey$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('episodeId')),
    filter((id): id is string => id !== null),
    share(),
  );

  public episode$: Observable<IPodcastEpisode | undefined> = this.episodeKey$.pipe(
    switchMap(key => this.podcastService.getEpisode(key)),
    tap(console.log)
  );

  playEpisode(episode: IPodcastEpisode) {
      this.audioService.playEpisode(episode);
      this.router.navigate(['/player']);
  }
}
