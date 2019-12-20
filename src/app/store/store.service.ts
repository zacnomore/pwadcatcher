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
    const oldValues = await this.podcasts.get(key) || [];
    // Exclude duplicates
    if (!oldValues.find(pod => pod.feedUrl === podcast.feedUrl)) {
      this.podcasts.set(key, [...oldValues, podcast]);
    }
    return key;
  }

  public async getPodcast(key: string): Promise<IPodcast | undefined> {
    const values = await this.podcasts.get(key);
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
  private configuredStore = new Store('pwa-podcatcher');
  private innerStore = new Map<K, V>();
  private storeInitialized: Promise<void>;

  constructor(private idbKey: string) {
    this.storeInitialized = new Promise(res => { this.initialize = res; });

    getIDB(idbKey, this.configuredStore).then(store => {
      if (store && this.isStore(store)) {
        // TODO: Figure out if we can string together some kind of type checking here
        const deserialized = this.deserialize(store as ISerializedMap<K, V>);

        if (deserialized) {
          this.innerStore = (deserialized as Map<K, V>);
        }

        this.initialize();
      }
    }).catch(e => {
      console.log('Store does not exist');
    });
  }
  private initialize: () => void = () => console.error('ooo execution');

  public async get(key: K): Promise<V | undefined> {
    await this.storeInitialized;
    return this.innerStore.get(key);
  }

  public set(key: K, value: V): Promise<void> {
    this.innerStore.set(key, value);
    // TODO: Optimize to incrementally add values
    return setIDB(this.idbKey, this.serialize(this.innerStore), this.configuredStore).catch(e => console.log(e));
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
