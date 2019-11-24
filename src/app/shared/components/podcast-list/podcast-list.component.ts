import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IImage } from '../../models/image.model';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent {
  @Input() list?: IListItem[];
  @Output() clickItem = new EventEmitter<number>();

  public onClickItem(index: number) {
    this.clickItem.emit(index);
  }
}

export interface IListItem {
  title: string;
  image?: IImage;
}
