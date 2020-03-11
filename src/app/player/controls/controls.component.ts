import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAudioState, AudioPlayerService, PlayerAction } from '../services/audio-player.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  public audioState$: Observable<IAudioState> = this.audio.audioState$;

  constructor(private audio: AudioPlayerService) { }

  public togglePlay = (playing: boolean) => this.audio.doAction(playing ? PlayerAction.Pause : PlayerAction.Play);
  public forward = () => this.audio.doAction(PlayerAction.FastForward);
  public rewind = () => this.audio.doAction(PlayerAction.FastRewind);

}
