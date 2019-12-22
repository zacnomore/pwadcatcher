import { Injectable } from '@angular/core';
import { IPodcast } from '../shared/models/podcast.model';
import { get as getIDB, set as setIDB, Store} from 'idb-keyval';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private podcasts = new PwaStore<IPodcast>('podcasts');

  public async addPodcast(podcast: IPodcast): Promise<string> {
    return this.podcasts.set(podcast.feedUrl, podcast);
  }

  public async getPodcast(key: string): Promise<IPodcast | undefined> {
    return this.podcasts.get(key);
  }

}

interface ISerializableKeyValuePair<V> {
  key: string;
  value: V;
}

interface ISerializedMap<V> {
  entries: Array<ISerializableKeyValuePair<V>>;
}
class PwaStore<V> {
  private configuredStore = new Store('pwa-podcatcher');
  private innerStore = new Map<string, V>();
  private storeInitialized: Promise<void>;

  constructor(private idbKey: string) {
    this.storeInitialized = new Promise(res => { this.initialize = res; });

    getIDB(idbKey, this.configuredStore).then(store => {
      if (store && this.isStore(store)) {
        // TODO: Figure out if we can string together some kind of type checking here
        const deserialized = this.deserialize(store as ISerializedMap<V>);

        if (deserialized) {
          this.innerStore = (deserialized as Map<string, V>);
        }

        this.initialize();
      }
    }).catch(e => {
      console.log('Store does not exist');
    });
  }
  private initialize: () => void = () => console.error('ooo execution');

  public async get(key: string): Promise<V | undefined> {
    await this.storeInitialized;
    return this.innerStore.get(key);
  }

  public async set(keyableProperty: string, value: V): Promise<string> {
    const key = this.toKey(keyableProperty);

    // TODO: Handle collisions
    this.innerStore.set(key, value);

    // TODO: Optimize to incrementally add values
    return setIDB(this.idbKey, this.serialize(this.innerStore), this.configuredStore)
      .then(v => key);
  }

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

  private isStore(s: unknown): s is ISerializedMap<unknown> {
    return Boolean((s as ISerializedMap<unknown>).entries);
  }

  private serialize(m: Map<string, V>): ISerializedMap<V> {
    return Array.from(m.entries()).reduce((acc: ISerializedMap<V>, [key, value]: [string, V]) =>
      ({ entries: [...acc.entries, { key, value }] }), {
      entries: [] as Array<ISerializableKeyValuePair<V>>
    });
  }

  private deserialize(serialized: ISerializedMap<V>): Map<string, V> {
    const map = new Map<string, V>();
    serialized.entries.forEach(({key, value}) => {
      map.set(key, value);
    });
    return map;
  }
}
