import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { IPodcastEpisode } from 'src/app/shared/podcast.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent {
  constructor(private podcastService: PodcastService) {}


  @Input()
  set episodeKey(key: string | undefined) {
    if(key) {
      this.podcastService.getEpisode(key).then(ep => {
        this.episode$.next(ep);
      });
    }
  }

  public episode$ = new Subject<IPodcastEpisode | undefined>();

  @Output() playEpisode: EventEmitter<IPodcastEpisode> = new EventEmitter<IPodcastEpisode>();
  @Output() queEpisode: EventEmitter<IPodcastEpisode> = new EventEmitter<IPodcastEpisode>();
}
