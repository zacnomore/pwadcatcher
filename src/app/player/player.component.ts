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
  public activePodcast$: Observable<PlayerView | undefined> = this.audio.currentEpisode$.pipe(
    map(episode => {
      if (episode) {
        return {
          thumbnail: episode?.image?.large || episode?.image?.medium || episode?.image?.small
        };
      }
    }));

  constructor(
    private audio: AudioPlayerService
  ) {}

}

interface PlayerView {
  thumbnail?: IImage;

}