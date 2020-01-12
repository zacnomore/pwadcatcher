import { Injectable } from '@angular/core';
import { StoreService, IStorable } from '../store/store.service';
import { IPodcast } from '../shared/models/podcast.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private store: StoreService) { }

  subscribe(podcastKey: string): string | undefined {
    return this.store.addSubscription({ podcastKey });
  }

  unsubscribe(podcastKey: string): void {
    return this.store.removeSubscription(podcastKey);
  }

  getSubscriptions(): IPodcast[] {
    return this.store.getAllSubscriptions().map(
      ({podcastKey}) => this.store.getPodcast(podcastKey)
    ).filter(
      (pod): pod is IPodcast => Boolean(pod)
    );
  }
}

export interface ISubcription  extends IStorable {
  podcastKey: string;
}
