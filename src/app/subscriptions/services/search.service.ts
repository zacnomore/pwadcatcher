import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAppleSearch } from './apple.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IImageSet } from 'src/app/shared/models/image.model';
import { EnvironmentService } from 'src/app/environments/environment.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, env: EnvironmentService) {
    console.log(env.env.production);
   }

  public appleSearch(term: string): Observable<IPodcastResult[]> {
    return this.http.get<IAppleSearch>(`/api/search?term=${term}`).pipe(
      map(this.appleToNormalized),
      catchError((e: HttpErrorResponse) => {
        console.log(e.status);
        return of([]);
      })
    );
  }

  private appleToNormalized(results: IAppleSearch): IPodcastResult[] {
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
  }
}

export interface IPodcastResult {
  name: string;
  feedUrl: string;
  thumbnail?: IImageSet;
}
