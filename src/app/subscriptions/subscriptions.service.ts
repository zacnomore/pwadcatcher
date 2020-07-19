import { Injectable } from '@angular/core';
import { StoreService, IStorable } from '../store/store.service';
import { IPodcast } from '../shared/podcast.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private store: StoreService) { }

  public subscribe(podcastKey: string): string | undefined {
    return this.store.setSubscription({ podcastKey });
  }

  public unsubscribe(podcastKey: string): void {
    return this.store.removeSubscription(podcastKey);
  }

  public async getSubscriptions(): Promise<IPodcast[]> {
    const subs = await this.store.getAllSubscriptions();
    const pods = await Promise.all(subs.map(
      ({ podcastKey }) => this.store.getPodcast(podcastKey)
    ));

    return pods.filter((pod): pod is IPodcast => Boolean(pod));
  }
}

export interface ISubscription extends IStorable {
  podcastKey: string;
}
