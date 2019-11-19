
interface IImageSet {
  small: IImage;
  medium?: IImage;
  large?: IImage;
}

interface IImage {
  src: string;
  alt?: string;
}
