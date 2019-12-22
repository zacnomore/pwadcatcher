import { Component, OnInit } from '@angular/core';
import { AudioPlayerService, IAudioState, PlayerAction } from './services/audio-player.service';
import { Observable, Subscription, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';
import { StoreService } from '../store/store.service';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public audioState$: Observable<IAudioState> = this.audio.audioState$;
  private subscriptions: Subscription[] = [];

  constructor(
    private audio: AudioPlayerService,
    private activeRoute: ActivatedRoute,
    private store: StoreService
  ) { }


  ngOnInit() {
    this.subscriptions.push(
      this.activeRoute.paramMap.pipe(
        map(params => params.get('episode')),
        filter((key: string | null): key is string => Boolean(key)),
        map(key => this.store.getEpisode(key)),
        switchMap(promise => from(promise)),
        switchMap(episode => this.audio.updateSource(episode.url))
      ).subscribe()
    );

    this.audio.updateSource('https://traffic.megaphone.fm/GLT1332195978.mp3?updated=1572639400');
  }

  public togglePlay = (playing: boolean) => this.audio.doAction(playing ? PlayerAction.Pause : PlayerAction.Play);
  public forward = () => this.audio.doAction(PlayerAction.FastForward);
  public rewind = () => this.audio.doAction(PlayerAction.FastRewind);
}


