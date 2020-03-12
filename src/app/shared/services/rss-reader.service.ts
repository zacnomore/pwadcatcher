import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IPodcastFeed, IPodcastEpisode } from '../models/podcast.model';
import { EnvironmentService } from 'src/app/environments/environment.service';
import { xml2js, Element as XMLElement } from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class RssReaderService {
  constructor(private http: HttpClient, private env: EnvironmentService) {}

  public readFeed(feedUrl: string): Observable<IPodcastFeed | undefined> {
    return this.http.get(`${this.env.env.feedReadUrl}?xmlUrl=${feedUrl}`, {responseType: 'text'}).pipe(
      map(xml => {
        const { elements: root } = xml2js(xml) as XMLElement;
        const rss: XMLElement = (root || []).find(el => el.name === 'rss') || {elements: []};
        const {elements: channel } = (rss.elements || []).find(el => el.name === 'channel') || { elements: []};

        const episodes: IPodcastEpisode[] | undefined = (channel || []).filter(
          el => el.name === 'item'
        ).map(({ elements }) => {
          const { elements: titleProps } = (elements || []).find(el => el.name === 'title') || {elements: []};
          const { text: title = '' } = (titleProps || []).find(el => el.text !== undefined) || { text: '' };

          const defaultUrl = { url: '' };
          const { attributes: enclosure = defaultUrl } = (elements || []).find(el => el.name === 'enclosure') || { attributes: defaultUrl };
          const audioUrl = (enclosure.url || '').toString();



          const { elements: descriptionProps } = (elements || []).find(
            el => el.name === 'description' || el.name === 'itunes:summary'
          ) || { elements: [] };
          const { cdata: description = '' } = (descriptionProps || []).find(el => el.cdata !== undefined) || { cdata: '' };

          const episode: IPodcastEpisode = {
            audioUrl,
            title: title.toString(),
            summary: description.toString()
          };
          return episode;
        });
        const noImage = { href: undefined };
        const { attributes: image } = (channel || []).find(el => el.name === 'itunes:image') || { attributes: noImage };

        const feed: IPodcastFeed = {
          defaultImage: image && typeof image.href === 'string'  ? {
            small: {
              src: image.href
            }
          } : undefined,
          episodes
        };
        return feed;
      }),
      catchError(err => {
        console.error(err);
        return of(undefined);
      })
    );
  }
}

