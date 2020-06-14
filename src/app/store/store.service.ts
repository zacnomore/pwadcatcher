import { Injectable } from '@angular/core';
import { IPodcast, IPodcastEpisode } from '../shared/models/podcast.model';
import { ISubscription } from '../subscriptions/subscriptions.service';
import { ISerializablePlaylist } from '../playlist/services/playlist.service';
import { PersistentStore } from './persistent-store';

// Doesn't need to be an `object` as it could be a string or number
// tslint:disable-next-line: ban-types
export interface IStorable { [key: string]: Object | undefined | null; }
export type ISetterConfig<T> = ISetterConfigUnHashed<T> | ISetterConfigPreHashed<T>;
export interface ISetterConfigUnHashed<T> { store: PersistentStore<T>; keyableProperty: keyof T; }
export interface ISetterConfigPreHashed<T> { store: PersistentStore<T>; prekeyedProperty: keyof T; }
const isPrehashed = <T>(config: ISetterConfig<T>): config is ISetterConfigPreHashed<T> =>
  !!(config as ISetterConfigPreHashed<T>).prekeyedProperty;

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private podcasts = new PersistentStore<IPodcast>('podcasts');
  private episodes = new PersistentStore<IPodcastEpisode>('episodes');
  private playlist = new PersistentStore<ISerializablePlaylist>('playlist');
  private subscriptions = new PersistentStore<ISubscription>('subscriptions');

  public setEpisode = this.createSetter({ store: this.episodes, keyableProperty: 'audioUrl' });
  public getEpisode = this.createGetter(this.episodes);

  public setPodcast = this.createSetter({ store: this.podcasts, prekeyedProperty: 'key' });
  public getPodcast = this.createGetter(this.podcasts);

  public setSubscription = this.createSetter({ store: this.subscriptions, keyableProperty: 'podcastKey' });
  public removeSubscription = this.createDeleter(this.subscriptions);
  public getSubscription = this.createGetter(this.subscriptions);
  public getAllSubscriptions = this.createCollector(this.subscriptions);

  public setPlaylist = this.createSetter({ store: this.playlist, prekeyedProperty: 'playlistKey' });
  public getPlaylist = this.createGetter(this.playlist);

  private createSetter<T extends IStorable>(config: ISetterConfig<T> | ISetterConfigPreHashed<T>): (v: T) => (string | undefined) {
    if(isPrehashed(config)) {
      const {store, prekeyedProperty} = config;
      return (v: T) => {
        const key = v[prekeyedProperty];
        if(key) {
          return store.set(key.toString(), v);
        }
      };
    } else {
      // Needs hashed
      const {store, keyableProperty} = config;
      return (value: T) => {
        const keyableValue = value[keyableProperty];
        if (!!keyableValue) {
          const key = this.toKey(
            keyableValue.toString()
          );
          return store.set(key, value);
        }

        // Key value undefined
        return undefined;
      };
    }
  }

  private createGetter<T>(store: PersistentStore<T>): (K: string) => Promise<(T | undefined)> {
    return (key: string) => store.get(key);
  }

  private createDeleter<T>(store: PersistentStore<T>): (K: string) => void {
    return (key: string) => {
      store.set(key, undefined);
    };
  }

  private createCollector<T>(store: PersistentStore<T>): () => Promise<T[]> {
    return () => store.getAll();
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
}
