import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAppleSearch } from './apple.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EnvironmentService } from 'src/app/environments/environment.service';
import { IPodcast } from 'src/app/shared/models/podcast.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private env: EnvironmentService) {}

  public appleSearch(term: string): Observable<IPodcast[]> {
    return this.http.get<IAppleSearch>(`${this.env.env.appleSearchUrl}?term=${term}`).pipe(
      map(this.appleToNormalized),
      catchError((e: HttpErrorResponse) => {
        console.error(e.status);
        return of([]);
      })
    );
  }

  private appleToNormalized(results: IAppleSearch): IPodcast[] {
    return results.results.map(result => ({
      name: result.collectionName,
      feedUrl: result.feedUrl,
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
  }
}
