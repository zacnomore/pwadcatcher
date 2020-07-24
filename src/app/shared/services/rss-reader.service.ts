import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IPodcastFeed, IPodcastEpisode } from '../podcast.model';
import { EnvironmentService } from 'src/app/environments/environment.service';
import { parse } from 'overly-simple-xml-parser';

type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  constructor(private http: HttpClient, private env: EnvironmentService) {}

  public readFeed(feedUrl: string): Observable<IPodcastFeed | undefined> {
    return this.http.get(`${this.env.env.feedReadUrl}?xmlUrl=${feedUrl}`, {responseType: 'text'}).pipe(
      map(xml => {
        const {rss} = parse(xml) as RecursivePartial<{
          rss: {
            channel: {
              'itunes:image': {
                '@_href': string;
              };
              title: string;
              description: string;
              image: {
                url: string;
              };
              item: {
                title: string;
                description: string;
                enclosure: {
                  '@_url': string;
                };
              'itunes:image': {
                '@_href': string;
              };
              }[];
            }
          }
        }>;
        const defaultUrl = rss?.channel?.['itunes:image']?.['@_href'] || rss?.channel?.image?.url;
        const defaultImage = defaultUrl ? {
          small: {
            src: defaultUrl
          }
        } : undefined;

        const episodes: IPodcastEpisode[] | undefined = rss?.channel?.item?.map(({
          title,
          description,
          enclosure,
          'itunes:image': image
        }) => ({
          title,
          summary: description,
          audioUrl: enclosure?.['@_url'],
          thumbnail: {
            small:  {
              src: image?.['@_href'] || defaultImage?.small.src || ''
            }
          }
        }) as IPodcastEpisode) || [];

        const feed: IPodcastFeed = {
          episodes,
          defaultImage,
          description: rss?.channel?.description
        };
        console.log(rss);
        console.log(feed);

        return feed;
      }),
      catchError(err => {
        console.error(err);
        return of(undefined);
      })
    );
  }
}

