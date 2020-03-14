import { Injectable } from '@angular/core';
import { IPodcastEpisode } from 'src/app/shared/models/podcast.model';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistBS: BehaviorSubject<IPodcastEpisode[]> = new BehaviorSubject([] as IPodcastEpisode[]);
  public playlist$: Observable<IPodcastEpisode[]> = this.playlistBS.asObservable();

  private currentEpisodeBS = new BehaviorSubject<number | null>(null);
  public currentEpisode$: Observable<IPodcastEpisode | null> = combineLatest([this.playlist$, this.currentEpisodeBS]).pipe(
    map(([playlist, currentIndex]) => currentIndex !== null ? playlist[currentIndex] : null),
    distinctUntilChanged(),
    shareReplay()
  );

  public playEpisode(episode: IPodcastEpisode) {
    this.addToPlaylist(episode);
    this.currentEpisodeBS.next(this.playlistBS.value.length - 1);
  }

  public addToPlaylist(episode: IPodcastEpisode): void {
    this.playlistBS.next([...this.playlistBS.value, episode]);
  }

  public removeFromPlaylist({ index, episode }: { index: undefined; episode: IPodcastEpisode; } | { index: number; episode: undefined; }) {
    const newPlaylist = this.playlistBS.value.filter((ep, ind) => {
      return ep !== episode && ind !== index;
    });
    this.playlistBS.next(newPlaylist);
  }

  public changeEpisode(indexShift: number) {
    const newIndex = (this.currentEpisodeBS.value || -1) + indexShift;
    if (newIndex > this.playlistBS.value.length - 1 || newIndex < 0) {
      this.currentEpisodeBS.next(null);
    } else {
      this.currentEpisodeBS.next(newIndex);
    }
  }
}