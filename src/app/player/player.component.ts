import { Component, OnInit } from '@angular/core';
import { RssReaderService } from '../services/rss-reader.service';
import { AudioPlayerService } from './services/audio-player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  constructor(private audio: AudioPlayerService) {

  }
}
