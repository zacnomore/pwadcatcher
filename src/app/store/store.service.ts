import { Injectable, OnDestroy, HostListener } from '@angular/core';
import { IPodcast } from '../shared/models/podcast.model';
import { get, set } from 'idb-keyval';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private podcasts = new PwaStore<string, IPodcast[]>('podcasts');

  public async addPodcast(podcast: IPodcast): Promise<string> {
    const key = this.toKey(podcast.feedUrl);
    const oldValues = this.podcasts.get(key) || [];
    this.podcasts.set(key, [...oldValues, podcast]);
    return key;
  }

  public getPodcast(key: string): IPodcast | undefined {
    const values = this.podcasts.get(key);
    // TODO: Handle collisions
    return values && values[0];
  }


  // Java hashcode
  private toKey(keyableValue: string): string {
    return Math.abs(
      keyableValue.split('').reduce((acc, cur) => {
        // tslint:disable-next-line: no-bitwise
        const hash = (acc << 5) - acc + cur.charCodeAt(0);
        // tslint:disable-next-line: no-bitwise
        return hash & hash;
      }, 0)
    ).toString();
  }
}

class PwaStore<K, V> {
  private innerStore = new Map<K, V>();

  constructor(private idbKey: string) {
    get(idbKey).then(store => {
      if (store instanceof Map.prototype.constructor) {
        const values = (store as Map<unknown, unknown>).entries().next();

        // TODO: Figure out if we can string together some kind of type checking here
        if (values) {
          this.innerStore = (store as Map<K, V>);
        }
       }
    }).catch(e => {
      console.log('Store does not exist');
    });
  }

  public get(key: K): V | undefined {
    return this.innerStore.get(key);
  }

  public set(key: K, value: V): Promise<void> {
    this.innerStore.set(key, value);
    console.log(this.idbKey);
    return set(this.idbKey, this.innerStore).catch(e => console.log(e));
  }
}
