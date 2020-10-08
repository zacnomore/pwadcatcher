import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PodcastService } from 'src/app/shared/services/podcast.service';
import { IPodcastEpisode } from 'src/app/shared/podcast.model';
import { from, Observable, of } from 'rxjs';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent {
  constructor(private podcastService: PodcastService) {}

  private _episodeKey?: string;
  @Input()
  get episodeKey(): string | undefined { return this._episodeKey; }
  set episodeKey(key: string | undefined) {
    this._episodeKey = key;
    this.episode$ = key ? from(this.podcastService.getEpisode(key)) : of();
  }
  public episode$: Observable<IPodcastEpisode | undefined> = of();

  @Output() playEpisode: EventEmitter<IPodcastEpisode> = new EventEmitter<IPodcastEpisode>();
  @Output() queEpisode: EventEmitter<IPodcastEpisode> = new EventEmitter<IPodcastEpisode>();
}
