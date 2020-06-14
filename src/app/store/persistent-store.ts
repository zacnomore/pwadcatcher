import { get as getIDB, set as setIDB, Store} from 'idb-keyval';
import { debounce } from '../shared/utils';

interface ISerializableKeyValuePair<V> {
  key: string;
  value: V;
}

interface ISerializedMap<V> {
  entries: ISerializableKeyValuePair<V>[];
}

export class PersistentStore<V> {
  private configuredStore = new Store('pwa-podcatcher');
  private innerStore = new Map<string, V>();
  private initialized: Promise<void>;

  private triggerStorage = debounce(() => setIDB(this.idbKey, this.serialize(this.innerStore), this.configuredStore));
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

  public set(key: string, value: V | undefined): string {
    if (value !== undefined) {
      // TODO: Handle collisions
      this.innerStore.set(key, value);
    } else {
      this.innerStore.delete(key);
    }
    this.triggerStorage();
    return key;
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