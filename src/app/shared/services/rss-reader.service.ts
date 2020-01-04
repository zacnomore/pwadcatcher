import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { xml2js } from 'xml-js';
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
    return this.http.get(`${this.env.env.feedReadUrl}?collectionId=${collectionId}`, { responseType: 'text'}).pipe(
      map(resp => xml2js(resp)),
      map(xml => ({
        episodes: xml.elements[0].elements[0].elements.filter(
          node => node.name === 'item'
        ).map(
          ep => ({
            title: ep.elements.find(el => el.name === 'title').elements[0].cdata,
            image: {small: ep.elements.find(el => el.name === 'itunes:image').attributes.href},
            ...ep
          })
        )
      } as IPodcastFeed)),
      tap(console.log),
      catchError(err => {
        console.error(err);
        return of(undefined);
      })
    );
  }
}

