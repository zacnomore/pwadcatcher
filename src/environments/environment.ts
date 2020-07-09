import { IEnvironment } from 'src/app/environments/environment.service';

export const environment: IEnvironment = {
  production: false,
  appleSearchUrl: 'https://pwa-podcatcher-nine-black.now.sh/api/search',
  feedReadUrl: 'https://pwa-podcatcher-nine-black.now.sh/api/feed',
  corsBounceUrl: (audioUrl) => `https://pwa-podcatcher-nine-black.now.sh/api/cors-bounce?audioUrl=${audioUrl}`
};
