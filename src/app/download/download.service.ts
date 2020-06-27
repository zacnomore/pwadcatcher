import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPodcastEpisode } from '../shared/models/podcast.model';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private http: HttpClient) { }

  downloadEpisode(episode: IPodcastEpisode): Observable<IDownloadProgress> {
    const req = new HttpRequest('GET', episode.audioUrl, {
      responseType: 'blob',
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      map(event => {
        if (event.type === HttpEventType.DownloadProgress && event.total) {
          const percentDone = Math.round(100 * event.loaded / event.total) || 0;
          return { percentDone, complete: false };
        } else if (event instanceof HttpResponse) {
          return { percentDone: 100, complete: true };
        }
      }),
      filter<IDownloadProgress | undefined, IDownloadProgress>((event): event is IDownloadProgress => event !== undefined)
    );
  }
}

export interface IDownloadProgress {
  percentDone?: number;
  complete: boolean;
}