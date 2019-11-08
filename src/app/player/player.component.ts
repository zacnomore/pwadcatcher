import { Component, OnInit } from '@angular/core';
import { RssReaderService } from '../services/rss-reader.service';
import { AudioPlayerService } from './services/audio-player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  feed$ = this.reader.readFeed('https://feeds.megaphone.fm/replyall');
  constructor(private reader: RssReaderService, private audio: AudioPlayerService) {
    this.audio.streamAudio('https://traffic.megaphone.fm/GLT1841079025.mp3');

  }
}
