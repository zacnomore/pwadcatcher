import { get as getIDB, set as setIDB, Store, keys} from 'idb-keyval';

export class PersistentStore<V> {
  private cache = new Map<string, V>();
  private initialized: Promise<void>;
  private configuredStore: Store;

  private markInitialization = () => { console.error('Intialization failed.'); };

  constructor(private idbKey: string) {
    this.initialized = new Promise((resolve) => { this.markInitialization = resolve; });
    this.configuredStore = new Store(this.idbKey);
    this.createMapFromStore(this.configuredStore).then(data => {
      this.cache = data;
    });
  }

  public async get(key: string): Promise<V | undefined> {
    await this.initialized;
    return this.cache.get(key);
  }

  public async getAll(): Promise<V[]> {
    await this.initialized;
    return Array.from(this.cache.values());
  }

  public set(key: string, value: V | undefined): string {
    if (value !== undefined) {
      this.cache.set(key, value);
    } else {
      this.cache.delete(key);
    }
    setIDB(key, value, this.configuredStore);
    return key;
  }

  private async createMapFromStore(store: Store): Promise<Map<string, V>> {
    const map = new Map<string, V>();
    try {
      const storeKeys = await keys(store);
      storeKeys.forEach((key, i, { length }) => {
        getIDB(key, store).then(value => {
          // TODO: Figure out if we can string together some kind of type checking here
          // tslint:disable-next-line: no-any
          map.set(key.toString(), value as any as V);

          if(i === length - 1) { this.markInitialization(); }
        });
      });
    } catch {
      console.warn('Store does not exist');
      this.markInitialization();
    }
    return map;
  }
}