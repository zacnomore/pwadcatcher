import { Injectable } from '@angular/core';
import { IPodcast, IPodcastEpisode } from '../shared/models/podcast.model';
import { get as getIDB, set as setIDB, Store} from 'idb-keyval';
import { BehaviorSubject } from 'rxjs';

// tslint:disable-next-line: ban-types
export interface IStorable { [key: string]: Object | undefined; }

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private podcasts = new PwaStore<IPodcast>('podcasts');
  private episodes = new PwaStore<IPodcastEpisode>('episodes');

  public addEpisode = this.createSetter<IPodcastEpisode>(this.episodes, 'audioUrl');
  public getEpisode = this.createGetter<IPodcastEpisode>(this.episodes);

  public addPodcast = this.createSetter<IPodcast>(this.podcasts, 'feedUrl');
  public getPodcast = this.createGetter<IPodcast>(this.podcasts);

  private createSetter<T extends IStorable>(store: PwaStore<T>, keyableProperty: keyof T): (v: T) => (string | undefined) {
    return (value: T) => {
      const keyableValue = value[keyableProperty];
      if (keyableValue) {
        return store.set(keyableValue.toString(), value);
      }
      return undefined;
    };
  }

  private createGetter<T>(store: PwaStore<T>): (K: string) => (T | undefined) {
    return (key: string) => store.get(key);
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
  private storeSynchronizedBS = new BehaviorSubject(false);

  constructor(private idbKey: string) {

    getIDB(idbKey, this.configuredStore).then(store => {
      if (store && this.isStore(store)) {
        // TODO: Figure out if we can string together some kind of type checking here
        const deserialized = this.deserialize(store as ISerializedMap<V>);

        if (deserialized) {
          this.innerStore = (deserialized as Map<string, V>);
          this.storeSynchronizedBS.next(true);
        }
      }
    }).catch(e => {
      console.log('Store does not exist');
    });
  }

  public get(key: string): V | undefined {
    return this.innerStore.get(key);
  }

  public set(keyableProperty: string, value: V): string {
    const key = this.toKey(keyableProperty);
    // TODO: Handle collisions
    this.innerStore.set(key, value);
    this.storeSynchronizedBS.next(false);

    setIDB(this.idbKey, this.serialize(this.innerStore), this.configuredStore)
      .then(v => this.storeSynchronizedBS.next(true));

    return key;
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
