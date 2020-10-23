import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAppleSearch, resultToPodcast } from './apple.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EnvironmentService } from 'src/app/environments/environment.service';
import { IPodcast } from 'src/app/shared/podcast.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private env: EnvironmentService) {}

  public appleSearch(term: string): Observable<IPodcast[] | Error> {
    return this.http.get<IAppleSearch>(`${this.env.env.appleSearchUrl}?term=${term}`).pipe(
      map(({ results }) => results.map(resultToPodcast)),
      catchError((e: HttpErrorResponse) => {
        console.error(e.status);
        return of(new Error('Search Failed'));
      })
    );
  }

  public findPodcast(key: string): Observable<IPodcast | Error> {
    return this.http.get<IAppleSearch>(`${this.env.env.appleSearchUrl}?term=${key}`).pipe(
      map(({ results }) => results.map(resultToPodcast)),
      map(results => results[0]),
      catchError((e: HttpErrorResponse) => {
        console.error(e.status);
        return of(new Error('Podcast Could Not Be Found'));
      })
    );
  }
}
