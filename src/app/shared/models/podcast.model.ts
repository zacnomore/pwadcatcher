import { IImageSet } from './image.model';
import { IStorable } from 'src/app/store/store.service';

export interface IPodcast extends IStorable {
  name: string;
  feedUrl: string;
  collectionId: number;
  thumbnail?: IImageSet;
  author?: string;
  feed?: IPodcastFeed;
}

export interface IInitializedPodcast extends IPodcast {
  feed: IPodcastFeed;
  description?: string;
}

export interface IPodcastFeed {
  episodes: IPodcastEpisode[];
}

export interface IPodcastEpisode extends IStorable {
  title: string;
  audioUrl: string;
  publishDate?: Date;
  image?: IImageSet;
}
