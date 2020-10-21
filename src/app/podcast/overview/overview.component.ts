import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPodcast, IPodcastFeed } from 'src/app/shared/podcast.model';
import { PodcastService } from 'src/app/shared/services/podcast.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  constructor(private podcastService: PodcastService) {}

  @Output() subscribe = new EventEmitter<string>();

  private readonly _podcastKey$ = new BehaviorSubject<string>('');
  @Input()
  get podcastKey(): string | undefined { return this._podcastKey$.value; }
  set podcastKey(key: string | undefined) {
    if(key) {
      this._podcastKey$.next(key);
    }
  }

  public overview$: Observable<IPodcast> = this._podcastKey$.pipe(
    switchMap(id => this.podcastService.getPodcast(id)),
    filter((podcast): podcast is IPodcast => podcast !== undefined)
  );

  public details$: Observable<IPodcastFeed> = this._podcastKey$.pipe(
    switchMap(key => this.podcastService.getFeed(key)),
    filter((podcast): podcast is IPodcastFeed => podcast !== undefined)
  );

  emitSubscribe(): void {
    this.subscribe.emit(this.podcastKey);
  }
}
