import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IImage } from '../../models/image.model';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent {
  @Input() list?: IListItem[];
  @Input() draggable?: boolean;
  @Output() clickItem = new EventEmitter<number>();
  @Output() reorder = new EventEmitter<ReorderedItem[]>();

  public onClickItem(index: number): void {
    this.clickItem.emit(index);
  }

  public drop(reorderedList: IListItem[]): void {
    this.reorder.emit(reorderedList.map(item => {
      const originalIndex = this.list?.findIndex(old => old === item);
      if (originalIndex === undefined) {
        throw new Error('Item can\'t be found in list during reorder');
      }
      return { originalIndex };
    }));
  }
}

export interface IListItem {
  title: string;
  image?: IImage;
}

export interface ReorderedItem {
  originalIndex: number;
}