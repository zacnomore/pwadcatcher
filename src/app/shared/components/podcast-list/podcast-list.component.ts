import { Component, OnInit, Input } from '@angular/core';
import { IImage } from '../../models/image.model';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent implements OnInit {
  @Input() list?: IListItem[];

  ngOnInit() {
  }

}

export interface IListItem {
  image?: IImage;
  title: string;
}
