
export interface IImageSet {
  small: IImage;
  medium?: IImage;
  large?: IImage;
}

export interface IImage {
  src: string;
  alt?: string;
}
