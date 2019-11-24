import { Injectable } from '@angular/core';
import { IPodcast } from '../shared/models/podcast.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private podcasts = new Map<number, IPodcast[]>();

  public addPodcast(podcast: IPodcast): number {
    const key = this.toKey(podcast.feedUrl);
    const oldValues = this.podcasts.get(key) || [];
    this.podcasts.set(key, [...oldValues, podcast]);
    return key;
  }

  public getPodcast(key: number): IPodcast | undefined {
    const values = this.podcasts.get(key);
    // TODO: Handle collisions
    return values && values[0];
  }


  // Java hashcode
  private toKey(keyableValue: string): number {
    return keyableValue.split('').reduce((acc, cur) => {
      // tslint:disable-next-line: no-bitwise
      const hash = (acc << 5) - acc + cur.charCodeAt(0);
      // tslint:disable-next-line: no-bitwise
      return hash & hash;
    }, 0);
  }
}
