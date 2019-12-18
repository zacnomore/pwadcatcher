import { Injectable, OnDestroy, HostListener } from '@angular/core';
import { IPodcast } from '../shared/models/podcast.model';
import { get as getIDB, set as setIDB, Store} from 'idb-keyval';

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

interface ISerializableKeyValuePair<K, V> {
  key: K;
  value: V;
}

interface ISerializedMap<K, V> {
  entries: Array<ISerializableKeyValuePair<K, V>>;
}
class PwaStore<K, V> {
  private innerStore = new Map<K, V>();

  constructor(private idbKey: string) {
    getIDB(idbKey).then(store => {
      console.log(store);
      if (store && this.isStore(store)) {
        // TODO: Figure out if we can string together some kind of type checking here
        const deserialized = this.deserialize(store as ISerializedMap<K, V>);

        if (deserialized) {
          this.innerStore = (deserialized as Map<K, V>);
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
    console.log(key);
    this.innerStore.set(key, value);
    console.log(this.innerStore);
    return setIDB(this.idbKey, this.serialize(this.innerStore), new Store('store')).catch(e => console.log(e));
  }

  private isStore(s: unknown): s is ISerializedMap<unknown, unknown> {
    return Boolean((s as ISerializedMap<unknown, unknown>).entries);
  }

  private serialize(m: Map<K, V>): ISerializedMap<K, V> {
    return Array.from(m.entries()).reduce((acc: ISerializedMap<K, V>, [key, value]: [K, V]) =>
      ({ entries: [...acc.entries, { key, value }] }), {
      entries: [] as Array<ISerializableKeyValuePair<K, V>>
    });
  }

  private deserialize(serialized: ISerializedMap<K, V>): Map<K, V> {
    const map = new Map<K, V>();
    serialized.entries.forEach(({key, value}) => {
      map.set(key, value);
    });
    return map;
  }
}
