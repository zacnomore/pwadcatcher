import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPodcast } from 'src/app/shared/models/podcast.model';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  currentPodcast$: Observable<IPodcast | undefined> = this.activateRoute.paramMap.pipe(
    map(params => params.get('id')),
    map(id => id ? this.store.getPodcast(id) : undefined)
    );

  constructor(private activateRoute: ActivatedRoute, private store: StoreService) { }

}
