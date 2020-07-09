import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { IPodcastEpisode } from '../shared/models/podcast.model';
import { StoreService } from '../store/store.service';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private store: StoreService, private http: HttpClient) {}

  public downloadEpisode(episode: IPodcastEpisode): Observable<IDownloadReport> {
    const sub = new Subject<IDownloadReport>();
    const req = new HttpRequest('GET', episode.audioUrl, { reportProgress: true, responseType: 'blob' } );
    this.http.request<Blob>(req).pipe(
      tap(event => {
        switch (event.type) {
          case HttpEventType.DownloadProgress:
            sub.next(new DownloadProgress(event.loaded, event.total, false));
          break;
          case HttpEventType.Response:
            if(event.body) {
              this.store.setEpisode({...episode, audio: event.body});
              sub.next(new DownloadProgress(1, 1, true));
            } else {
              sub.next({
                failure: true,
                reason: 'unknown'
              });
            }
            break;
          default:
            sub.next({
              failure: true,
              reason: event.type.toString()
            });
        }
      }),
      catchError(err => {
        sub.next({
          failure: true,
          reason: err
        });
        return of();
      })
    ).subscribe();

    return sub;
  }
}


export class DownloadProgress {
  constructor(public received?: number, public total?: number, public complete?: boolean) {}
  failure = false;
  public get progress(): number {
    return ((this.received || 0) / (this.total || Number.MAX_SAFE_INTEGER)) * 100;
  }
}
export interface IDownloadFailure {
  failure: true;
  reason: string;
}

export type IDownloadReport = DownloadProgress | IDownloadFailure;