import { IncomingMessage, IncomingHttpHeaders, get } from 'http';
import { get as httpsGet } from 'https';
import { followRedirects } from '../api-utils/follow-redirect';

export interface ISimpleResponse {
  rawData: string;
  headers: IncomingHttpHeaders;
  statusCode?: number;
}

export function collectResponse(response: IncomingMessage): Promise<ISimpleResponse> {
  let rawData = '';
  response.on('data', (chunk) => { rawData += chunk; });
  return new Promise((res, rej) => {
    response.on('end', () => res({ rawData, headers: response.headers, statusCode: response.statusCode }));
    response.on('error', err => rej(err));
  });
}

export function simpleRequest(url: string, noFollow: boolean = false): Promise<ISimpleResponse> {
  return new Promise(res => {


  const getMethod = url.includes('https') ? httpsGet : get;

  getMethod(url, async incoming => {
      const response = await collectResponse(incoming);
      if (noFollow) {
        res(response);
      } else {
        res(followRedirects(response));
      }
    });
  });
}
