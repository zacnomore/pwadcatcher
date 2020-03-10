import { Component } from '@angular/core';
import { AudioPlayerService, IAudioState, PlayerAction } from './services/audio-player.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IImage } from '../shared/models/image.model';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  public audioState$: Observable<IAudioState> = this.audio.audioState$;
  public activePodcast$: Observable<PlayerView> = this.audio.currentEpisode$.pipe(
    map(episode => ({
      thumbnail: episode?.image?.large || episode?.image?.medium || episode?.image?.small
    }))
  );

  constructor(
    private audio: AudioPlayerService
  ) {}

  public togglePlay = (playing: boolean) => this.audio.doAction(playing ? PlayerAction.Pause : PlayerAction.Play);
  public forward = () => this.audio.doAction(PlayerAction.FastForward);
  public rewind = () => this.audio.doAction(PlayerAction.FastRewind);
}

interface PlayerView {
  thumbnail?: IImage;

}