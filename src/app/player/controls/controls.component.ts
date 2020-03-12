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
    map(audio => {
      const durationData = this.toTimeString(audio.duration);
      const model: ControlsModel = {
        ...audio,
        hasDuration: durationData.isValid,
        durationReadable: durationData.readableTime,
        currentTimeReadable: this.toTimeString(audio.currentTime).readableTime,
      };
      return model;
    })
  );
  public togglePlay = (playing: boolean) => this.audio.doAction(playing ? PlayerAction.Pause : PlayerAction.Play);
  public forward = () => this.audio.doAction(PlayerAction.FastForward);
  public rewind = () => this.audio.doAction(PlayerAction.FastRewind);
  public seek = (value: number) => this.audio.doAction(PlayerAction.Seek, value);
  public formatLabel = (value: number) => this.toTimeString(value);


  constructor(private audio: AudioPlayerService) { }

  private toTimeString(time: number): { readableTime: string, isValid: boolean} {
    if (isNaN(time)) {
      return {
        readableTime: '--:--',
        isValid: false
      };
    }
    const date = new Date(0);
    let readableTime: string;
    date.setSeconds(time);
    if (date.getUTCHours() > 0) {
      readableTime = date.toISOString().substr(11, 8);
    } else {
      readableTime = date.toISOString().substr(14, 5);
    }

    return {
      readableTime,
      isValid: true
    };
  }
}

interface ControlsModel extends IAudioState {
  currentTimeReadable: string;
  durationReadable: string;
  hasDuration: boolean;
}