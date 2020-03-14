import { Injectable } from '@angular/core';
import { IPodcastEpisode } from 'src/app/shared/models/podcast.model';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, shareReplay, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistBS: BehaviorSubject<IPodcastEpisode[]> = new BehaviorSubject([] as IPodcastEpisode[]);
  public playlist$: Observable<IPodcastEpisode[]> = this.playlistBS.asObservable();

  private currentEpisodeBS = new BehaviorSubject<number | null>(null);
  public currentEpisode$: Observable<IPodcastEpisode | null> = combineLatest([this.playlist$, this.currentEpisodeBS]).pipe(
    map(([playlist, currentIndex]) => currentIndex !== null ? playlist[currentIndex] || null : null),
    debounceTime(100), // This is needed because reordering the items needs both bs's to change
    distinctUntilChanged(),
    shareReplay()
  );

  public canPlayNext$ = combineLatest([this.currentEpisodeBS, this.playlist$]).pipe(
    map(([index, playlist]) => {
    return index !== null && index + 1 < playlist.length;
    }));

  public canPlayPrev$: Observable<boolean> = this.currentEpisodeBS.pipe(
    map(index => !!index && index > 0)
  );

  public playEpisode(episode: IPodcastEpisode) {
    this.addToPlaylist(episode);
    this.currentEpisodeBS.next(this.playlistBS.value.length - 1);
  }

  public addToPlaylist(episode: IPodcastEpisode): void {
    if (this.currentEpisodeBS.value === null) {
      this.currentEpisodeBS.next(0);
    }
    this.playlistBS.next([...this.playlistBS.value, episode]);
  }

  public removeFromPlaylist({ index, episode }: { index: undefined; episode: IPodcastEpisode; } | { index: number; episode: undefined; }) {
    const newPlaylist = this.playlistBS.value.filter((ep, ind) => {
      return ep !== episode && ind !== index;
    });
    this.playlistBS.next(newPlaylist);
  }

  public changeEpisode(indexShift: number) {
    const newIndex = (this.currentEpisodeBS.value === null ? -1 : this.currentEpisodeBS.value) + indexShift;
    if (newIndex > this.playlistBS.value.length - 1 || newIndex < 0) {
      this.currentEpisodeBS.next(null);
    } else {
      this.currentEpisodeBS.next(newIndex);
    }
  }

  public reorder(oldIndex: number, newIndex: number) {

    const valueToMove = this.playlistBS.value[oldIndex];
    const newPlaylist = [
      ...this.playlistBS.value.slice(0, oldIndex),
      ...this.playlistBS.value.slice(oldIndex + 1, this.playlistBS.value.length)
    ];
    newPlaylist.splice(newIndex, 0, valueToMove);

    const playingEpisode = this.playlistBS.value[this.currentEpisodeBS.value === null ? -1 : this.currentEpisodeBS.value];
    const playingIndex = newPlaylist.findIndex(ep => ep === playingEpisode);

    this.playlistBS.next(newPlaylist);
    this.currentEpisodeBS.next(playingIndex === -1 ? null : playingIndex);
  }
}