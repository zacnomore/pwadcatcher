import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, share } from 'rxjs/operators';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { AudioPlayerService } from 'src/app/player/services/audio-player.service';

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

  public episodeKey$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('episodeId')),
    filter((id): id is string => id !== null),
    share(),
  );

  playEpisode(episodeKey: string) {
    this.podcastService.getEpisode(episodeKey).then(ep => {
      if (ep !== undefined) {
        this.audioService.playEpisode(ep);
        this.router.navigate(['/player']);
      }
    });
  }

}
