import { IEnvironment } from 'src/app/environments/environment.service';

export const environment: IEnvironment = {
  production: true,
  appleSearchUrl: '/api/search',
  feedReadUrl: '/api/feed',
  corsBounceUrl: (audioUrl) => `/api/cors-bounce?audioUrl=${audioUrl}`
};
