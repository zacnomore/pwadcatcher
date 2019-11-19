import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAppleSearch } from './apple.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public appleSearch(term: string): Observable<IPodcastResult[]> {
    return this.http.get<IAppleSearch>(`/api/search?term=${term}`).pipe(
      map(results => {
        return results.results.map(result => ({
          name: result.collectionName,
          feedUrl: result.collectionViewUrl,
          thumbnail: {
            large: {
              src: result.artworkUrl600
            },
            medium: {
              src: result.artworkUrl100
            },
            small: {
              src: result.artworkUrl30
            }
          }
        }));
      }),
      catchError((e: HttpErrorResponse) => {
        console.log(e.status);
        return of([]);
      })
    );
  }
}

export interface IPodcastResult {
  name: string;
  feedUrl: string;
  thumbnail?: IImageSet;
}
