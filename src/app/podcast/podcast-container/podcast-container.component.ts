import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, share, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-podcast-container',
  templateUrl: './podcast-container.component.html',
  styleUrls: ['./podcast-container.component.scss']
})
export class PodcastContainerComponent {

  constructor(private activatedRoute: ActivatedRoute) {}

  public episodeKey$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('episodeId')),
    filter((id): id is string => id !== null),
    share(),
  );

  public podcastKey$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(params => params.get('podId')),
    filter((id): id is string => id !== null),
    shareReplay()
  );
}
