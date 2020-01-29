import { IncomingMessage, IncomingHttpHeaders, get } from 'http';
import { followRedirects } from '../api-utils/follow-redirect';

export interface ISimpleResponse {
  rawData: string;
  headers: IncomingHttpHeaders;
  statusCode?: number;
}

export function collectResponse(respose: IncomingMessage): Promise<ISimpleResponse> {
  let rawData = '';
  respose.on('data', (chunk) => { rawData += chunk; });
  return new Promise((res, rej) => {
    respose.on('end', () => res({ rawData, headers: respose.headers, statusCode: respose.statusCode }));
    respose.on('error', err => rej(err));
  });
}

export function simpleRequest(url: string, noFollow: boolean = false): Promise<ISimpleResponse> {
  return new Promise(res => {
    get(url.replace('https://', 'http://'), async incoming => {
      const response = await collectResponse(incoming);
      if (noFollow) {
        res(response);
      } else {
        res(followRedirects(response));
      }
    });
  });
}
