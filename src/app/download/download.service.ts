import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPodcastEpisode } from '../shared/models/podcast.model';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private store: StoreService) { }

  public downloadEpisode(episode: IPodcastEpisode): Observable<DownloadProgress> {
    const sub = new Subject<DownloadProgress>();
    // const downloader = this.buildDownloader(episode.audioUrl);
    fetch(episode.audioUrl, {
      mode: 'no-cors'
    }).then(resp => resp.blob()).then(audio => {
      this.store.setEpisode({...episode, audio});
      sub.next(new DownloadProgress(1, 1, true));
    });
    return sub.asObservable();
  }

  public async download(downloader: AsyncGenerator<DownloadProgress | Blob>, sub: Subject<DownloadProgress>): Promise<Blob | undefined> {
    for await(const progress of downloader) {
      if(progress instanceof DownloadProgress) {
        sub.next(progress);
      } else {
        return progress;
      }
    }
  }

  public async* buildDownloader(url: string): AsyncGenerator<DownloadProgress | Blob> {
    const response = await fetch(url);

    if(response.body) {
        const reader = response.body.getReader();
        const total: number = +(response.headers.get('Content-Length') || Number.MAX_SAFE_INTEGER);
        let receivedLength = 0; // received that many bytes at the moment
        const chunks: Uint8Array[] = []; // array of received binary chunks (comprises the body)

        let downloading = true;
        while(downloading) {
          const {done, value} = await reader.read();
          downloading = !done;
          if(value) {
            chunks.push(value);
            receivedLength += value.length;
            yield new DownloadProgress(total, receivedLength);
          }
        }

      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for(const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }
      yield new Blob([chunksAll]);
    } else {
      throw new Error('No body in response');
    }
  }
}

export class DownloadProgress {
  constructor(public received?: number, public total?: number, public complete?: boolean) {}
}