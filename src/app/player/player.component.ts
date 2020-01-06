import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioPlayerService, IAudioState, PlayerAction } from './services/audio-player.service';
import { Observable, Subscription, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { IPodcastEpisode } from '../shared/models/podcast.model';
import { PodcastService } from '../shared/services/podcast.service';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  public audioState$: Observable<IAudioState> = this.audio.audioState$;
  private subscriptions: Subscription[] = [];

  constructor(
    private audio: AudioPlayerService,
    private activeRoute: ActivatedRoute,
    private podcasts: PodcastService) { }


  ngOnInit() {
    this.subscriptions.push(
      this.activeRoute.paramMap.pipe(
        map(params => params.get('episode')),
        filter((key: string | null): key is string => Boolean(key)),
        map(key => this.podcasts.getEpisode(key)),
        switchMap(promise => from(promise)),
        filter((key: IPodcastEpisode | undefined): key is IPodcastEpisode => Boolean(key)),
        tap(episode => this.audio.updateSource(episode.audioUrl))
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public togglePlay = (playing: boolean) => this.audio.doAction(playing ? PlayerAction.Pause : PlayerAction.Play);
  public forward = () => this.audio.doAction(PlayerAction.FastForward);
  public rewind = () => this.audio.doAction(PlayerAction.FastRewind);
}


