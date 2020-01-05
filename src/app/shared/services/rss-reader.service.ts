import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IPodcastFeed } from '../models/podcast.model';
import { EnvironmentService } from 'src/app/environments/environment.service';
@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  constructor(private http: HttpClient, private env: EnvironmentService) {}

  public readFeed(collectionId: number): Observable<IPodcastFeed | undefined> {
    console.log(collectionId, 'read feed');
    return this.http.get<IPodcastFeed>(`${this.env.env.feedReadUrl}?collectionId=${collectionId}`).pipe(
      tap(console.log),
      catchError(err => {
        console.error(err);
        return of(undefined);
      })
    );
  }
}

