import { Component, OnInit } from '@angular/core';
import { IListItem } from '../shared/components/podcast-list/podcast-list.component';
import { SubscriptionsService } from './subscriptions.service';
import { Router } from '@angular/router';
import { IPodcast } from '../shared/models/podcast.model';

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
    private router: Router) {

  }

  ngOnInit(): void {
    // This has timing problems, how to get updated subscriptions?
    this.subscriptionService.getSubscriptions().then(
      subs => this.subscriptions = subs
    );
  }

  viewPodcast(index: number): void {
    // Now how do we get a key? Need a better solution for state transfer..
    // this.router.navigate(['podcast', 'overview', ...);
  }
}
