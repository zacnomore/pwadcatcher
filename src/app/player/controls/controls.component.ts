import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAudioState, AudioPlayerService, PlayerAction } from '../services/audio-player.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  public audioState$: Observable<ControlsModel> = this.audio.audioState$.pipe(
    map(audio => ({
      ...audio,
      currentTimeReadable: this.toTimeString(audio.currentTime),
      durationReadable: this.toTimeString(audio.duration)
    } as ControlsModel))
  );

  constructor(private audio: AudioPlayerService) { }

  public togglePlay = (playing: boolean) => this.audio.doAction(playing ? PlayerAction.Pause : PlayerAction.Play);
  public forward = () => this.audio.doAction(PlayerAction.FastForward);
  public rewind = () => this.audio.doAction(PlayerAction.FastRewind);
  private toTimeString = (time: number) => {
    if (isNaN(time)) {
      return '--:--';
    }
    const date = new Date(0);
    date.setSeconds(time);
    if (date.getUTCHours() > 0) {
      return date.toISOString().substr(11, 8);
    } else {
      return date.toISOString().substr(14, 5);
    }
  }

}

interface ControlsModel extends IAudioState {
  currentTimeReadable: string;
  durationReadable: string;
}