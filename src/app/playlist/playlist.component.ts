import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './services/playlist.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { IListItem, ReorderedItem } from '../shared/components/podcast-list/podcast-list.component';
import { Observable, combineLatest } from 'rxjs';
import { AudioPlayerService } from '../player/services/audio-player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  public playlist$: Observable<IListItem[]> = combineLatest(
    [this.playlistService.playlist$, this.playlistService.currentEpisode$, this.audioService.audioState$.pipe(
      map(aud => aud.isPlaying),
      distinctUntilChanged()
    )]
  ).pipe(
    map(([episodes, current, isPlaying]) => episodes.map(episode => {
      const item: IListItem = {
        title: episode.title,
        image: episode.thumbnail?.small,
        selected: isPlaying && current === episode
      };
      return item;
    })),
    distinctUntilChanged()
  );

  constructor(
    private playlistService: PlaylistService,
    private audioService: AudioPlayerService
  ) { }

  public reorderPlaylist(reorderedItem: ReorderedItem) {
    this.playlistService.reorder(reorderedItem.previousIndex, reorderedItem.currentIndex);
  }
}
