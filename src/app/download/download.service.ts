import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPodcastEpisode } from '../shared/models/podcast.model';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { map, filter, share } from 'rxjs/operators';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private http: HttpClient, private store: StoreService) { }

  public downloadEpisode(episode: IPodcastEpisode): Observable<IDownloadProgress> {
    const req = new HttpRequest('GET', episode.audioUrl, {
      responseType: 'blob',
      reportProgress: true,
    });

    const progress = this.http.request<Blob>(req).pipe(
      map(event => {
        if (event.type === HttpEventType.DownloadProgress && event.total) {
          const percentDone = Math.round(100 * event.loaded / event.total) || 0;
          return { percentDone, complete: false };
        } else if (event instanceof HttpResponse && event.body instanceof Blob) {
          this.store.setEpisode({...episode, audio: event.body});
          return { percentDone: 100, complete: true };
        }
      }),
      filter<IDownloadProgress | undefined, IDownloadProgress>((event): event is IDownloadProgress => event !== undefined),
      share()
    );

    // We want the call to complete whether or not the requester is watching progress
    progress.subscribe();

    return progress;
  }
}

export interface IDownloadProgress {
  percentDone?: number;
  complete: boolean;
}