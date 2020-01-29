import { IncomingMessage, IncomingHttpHeaders, get } from 'http';

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

export function simpleRequest(url: string): Promise<ISimpleResponse> {
  return new Promise(res => {
    get(url.replace('https://', 'http://'), incoming => {
      collectResponse(incoming).then(response => {
        res(response);
      });
    });
  });
}
