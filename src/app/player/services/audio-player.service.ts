import { Injectable } from '@angular/core';
import { PlayerModule } from '../player.module';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio = new Audio();

  constructor() { }

  streamAudio(url: string) {
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
  }

}
