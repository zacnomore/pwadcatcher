import { IPodcast } from 'src/app/shared/models/podcast.model';

export interface IAppleSearch {
  resultCount: number;
  results: IResult[];
}

export interface IResult {
  wrapperType: WrapperType;
  kind: Kind;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  trackRentalPrice: number;
  collectionHdPrice: number;
  trackHdPrice: number;
  trackHdRentalPrice: number;
  releaseDate: string;
  collectionExplicitness: Explicitness;
  trackExplicitness: Explicitness;
  trackCount: number;
  country: Country;
  currency: Currency;
  primaryGenreName: string;
  contentAdvisoryRating?: ContentAdvisoryRating;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
  artistId?: number;
  artistViewUrl?: string;
}

export enum Explicitness {
  Cleaned = 'cleaned',
  Explicit = 'explicit',
  NotExplicit = 'notExplicit',
}

export enum ContentAdvisoryRating {
  Clean = 'Clean',
  Explicit = 'Explicit',
}

export enum Country {
  Usa = 'USA',
}

export enum Currency {
  Usd = 'USD',
}

export enum Kind {
  Podcast = 'podcast',
}

export enum WrapperType {
  Track = 'track',
}

export const resultToPodcast: (result: IResult) => IPodcast  = (result: IResult) => ({
  name: result.collectionName,
  feedUrl: result.feedUrl,
  key: result.collectionId,
  thumbnail: {
    large: {
      src: result.artworkUrl600
    },
    medium: {
      src: result.artworkUrl100
    },
    small: {
      src: result.artworkUrl30
    }
  }
});
