import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './services/playlist.service';
import { map } from 'rxjs/operators';
import { IListItem, ReorderedItem } from '../shared/components/podcast-list/podcast-list.component';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  public playlist$: Observable<IListItem[]> = combineLatest([this.playlistService.playlist$, this.playlistService.currentEpisode$]).pipe(
    map(([episodes, current]) => episodes.map(episode => {
    const item: IListItem = {
        title: episode.title,
        image: episode.thumbnail?.small,
        icon: episode === current ? 'play_arrow' : undefined
      };

      return item;
    }))
  );

  constructor(private playlistService: PlaylistService) {}

  public reorderPlaylist(reorderedItem: ReorderedItem) {
    this.playlistService.reorder(reorderedItem.previousIndex, reorderedItem.currentIndex);
  }
}
