import { Component, OnInit } from '@angular/core';
import { AudioPlayerService, IAudioState, PlayerAction } from './services/audio-player.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  constructor(private audio: AudioPlayerService) { }
  audioState$: Observable<IAudioState> = this.audio.audioState$;

  ngOnInit() {
    this.audio.updateSource('https://traffic.megaphone.fm/GLT1332195978.mp3?updated=1572639400');
  }

  public togglePlay = (playing: boolean) => this.audio.doAction(playing ? PlayerAction.Pause : PlayerAction.Play);
  public forward = () => this.audio.doAction(PlayerAction.FastForward);
  public rewind = () => this.audio.doAction(PlayerAction.FastRewind);
}


