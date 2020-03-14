import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IAudioState, AudioPlayerService, PlayerAction } from '../services/audio-player.service';
import { tap, map } from 'rxjs/operators';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  public audioState$: Observable<ControlsModel> = combineLatest(
    [this.audio.audioState$, this.playlist.canPlayNext$, this.playlist.canPlayPrev$]
  ).pipe(
    map(([audio, canSkip, canPrev]) => {
      const durationData = this.toTimeString(audio.duration);
      const model: ControlsModel = {
        ...audio,
        canSkip,
        canPrev,
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
  public prev = () => this.audio.doAction(PlayerAction.SkipPrevious);
  public next = () => this.audio.doAction(PlayerAction.SkipNext);
  public seek = (value: number) => this.audio.doAction(PlayerAction.Seek, value);
  public formatLabel = (value: number) => this.toTimeString(value).readableTime;


  constructor(private audio: AudioPlayerService, private playlist: PlaylistService) { }

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
  canSkip: boolean;
  canPrev: boolean;
}