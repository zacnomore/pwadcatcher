import { Component, OnInit } from '@angular/core';
import { IListItem } from '../shared/components/podcast-list/podcast-list.component';
import { SubscriptionsService } from './subscriptions.service';
import { Router } from '@angular/router';
import { IPodcast } from '../shared/models/podcast.model';
import { PodcastService } from '../shared/services/podcast.service';

@Component({
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  private subscriptions: IPodcast[] = [];
  public get list(): IListItem[] {
    return this.subscriptions.map(
      sub => ({
        title: sub.name,
        image: sub.thumbnail ? sub.thumbnail.small : undefined
      })
    );
  }

  constructor(
    private subscriptionService: SubscriptionsService,
    private podcastService: PodcastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // This has timing problems, how to get updated subscriptions?
    this.subscriptionService.getSubscriptions().then(
      subs => this.subscriptions = subs
    );
  }

  viewPodcast(index: number): void {
    const key = this.podcastService.getPodcastKey(this.subscriptions[index]);
    this.router.navigate(['podcast', 'feed', key]);
  }
}
