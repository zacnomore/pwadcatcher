import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AudioPlayerService } from '../services/audio-player.service';
import { IImage } from 'src/app/shared/models/image.model';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent {

  public activePodcast$: Observable<PlayerView | undefined> = this.playlist.currentEpisode$.pipe(
    map(episode => {
      if (episode) {
        const model: PlayerView = {
          thumbnail: episode?.thumbnail?.large || episode?.thumbnail?.medium || episode?.thumbnail?.small,
          title: episode.title
        };
        return model;
      }
    }));

  constructor(
    private playlist: PlaylistService
  ) {}

}

interface PlayerView {
  thumbnail?: IImage;
  title?: string;
}