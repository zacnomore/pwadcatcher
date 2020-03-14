import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './services/playlist.service';
import { map } from 'rxjs/operators';
import { IListItem, ReorderedItem } from '../shared/components/podcast-list/podcast-list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  public playlist$: Observable<IListItem[]> = this.playlistService.playlist$.pipe(
    map(episodes => episodes.map(episode => {
      const item: IListItem = {
        title: episode.title,
        image: episode.thumbnail?.small
      };

      return item;
    }))
  );

  constructor(private playlistService: PlaylistService) {}

  public reorderPlaylist(reorderedItem: ReorderedItem) {
    this.playlistService.reorder(reorderedItem.previousIndex, reorderedItem.currentIndex);
  }
}
