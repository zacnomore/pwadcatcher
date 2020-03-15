import { Injectable } from '@angular/core';
import { IPodcast, IPodcastEpisode } from '../shared/models/podcast.model';
import { get as getIDB, set as setIDB, Store} from 'idb-keyval';
import { debounce } from '../shared/utils';
import { ISubscription } from '../subscriptions/subscriptions.service';
import { ISerializablePlaylist } from '../playlist/services/playlist.service';

// Doesn't need to be an `object` as it could be a string or number
// tslint:disable-next-line: ban-types
export interface IStorable { [key: string]: Object | undefined | null; }

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private podcasts = new PwaStore<IPodcast>('podcasts');
  private episodes = new PwaStore<IPodcastEpisode>('episodes');
  private playlist = new PwaStore<ISerializablePlaylist>('playlist');
  private subscriptions = new PwaStore<ISubscription>('subscriptions');

  public addEpisode = this.createSetter(this.episodes, 'audioUrl');
  public getEpisode = this.createGetter(this.episodes);

  public addPodcast = this.createSetter(this.podcasts, 'feedUrl');
  public keyPodcast = this.createKeyer(this.podcasts, 'feedUrl');
  public getPodcast = this.createGetter(this.podcasts);

  public addSubscription = this.createSetter(this.subscriptions, 'podcastKey');
  public removeSubscription = this.createDeleter(this.subscriptions);
  public getSubscription = this.createGetter(this.subscriptions);
  public getAllSubscriptions = this.createCollector(this.subscriptions);

  public setPlaylist = this.createSetter(this.playlist, 'playlistKey');
  public getPlaylist = this.createGetter(this.playlist);

  private createSetter<T extends IStorable>(store: PwaStore<T>, keyableProperty: keyof T): (v: T) => (string | undefined) {
    return (value: T) => {
      const keyableValue = value[keyableProperty];
      if (keyableValue) {
        return store.set(keyableValue.toString(), value);
      }
      return undefined;
    };
  }

  private createGetter<T>(store: PwaStore<T>): (K: string) => Promise<(T | undefined)> {
    return (key: string) => store.get(key);
  }

  private createDeleter<T>(store: PwaStore<T>): (K: string) => void {
    return (key: string) => {
      store.set(key, undefined);
    };
  }

  private createKeyer<T extends IStorable>(store: PwaStore<T>, keyableProperty: keyof T): (v: T) => (string | undefined) {
    return (value: T) => {
      const prop = value[keyableProperty];
      if (prop) { return store.toKey(prop.toString()); }
    };
  }

  private createCollector<T>(store: PwaStore<T>): () => Promise<T[]> {
    return () => store.getAll();
  }
}

interface ISerializableKeyValuePair<V> {
  key: string;
  value: V;
}

interface ISerializedMap<V> {
  entries: ISerializableKeyValuePair<V>[];
}
class PwaStore<V> {
  private configuredStore = new Store('pwa-podcatcher');
  private innerStore = new Map<string, V>();
  private triggerStorage = debounce(() => setIDB(this.idbKey, this.serialize(this.innerStore), this.configuredStore));
  private initialized: Promise<void>;
  private markInitialization = () => { console.error('Intialization failed.'); };

  constructor(private idbKey: string) {
    this.initialized = new Promise((resolve) => { this.markInitialization = resolve; });
    getIDB(idbKey, this.configuredStore).then(store => {
      if (store && this.isStore(store)) {
        // TODO: Figure out if we can string together some kind of type checking here
        const deserialized = this.deserialize(store as ISerializedMap<V>);

        if (deserialized) {
          this.innerStore = (deserialized as Map<string, V>);
        }
      }
      this.markInitialization();
    }).catch(e => {
      console.warn('Store does not exist');
    });
  }

  public async get(key: string): Promise<V | undefined> {
    await this.initialized;
    return this.innerStore.get(key);
  }

  public async getAll(): Promise<V[]> {
    await this.initialized;
    return Array.from(this.innerStore.values());
  }

  public set(keyableValue: string, value: V | undefined): string {
    const key = this.toKey(keyableValue);
    if (value !== undefined) {
      // TODO: Handle collisions
      this.innerStore.set(key, value);
    } else {
      this.innerStore.delete(key);
    }

    this.triggerStorage();

    return key;
  }

  public toKey(keyableValue: string): string {
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
      entries: [] as ISerializableKeyValuePair<V>[]
    });
  }

  private deserialize(serialized: ISerializedMap<V>): Map<string, V> {
    const map = new Map<string, V>();
    serialized.entries.forEach(({ key, value }) => {
      map.set(key, value);
    });
    return map;
  }
}
