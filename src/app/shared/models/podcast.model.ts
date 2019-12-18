import { IImageSet } from './image.model';

export interface IPodcast {
  name: string;
  feedUrl: string;
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

export interface IPodcastEpisode {
  title: string;
  publishDate?: Date;
  image?: IImageSet;
}
