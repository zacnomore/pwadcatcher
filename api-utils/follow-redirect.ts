import { ISimpleResponse, simpleRequest } from '../api-utils/simple';
export function followRedirects(response: ISimpleResponse, numberToFollow: number = 2): Promise<ISimpleResponse> {
  return new Promise((res, rej) => {
    // Is a redirect
    if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400) {
      // Cannot follow
      console.log(response);
      if (!response.headers.location) {
        rej('No redirect location');
      } else if (numberToFollow <= 0) {
        rej('Too many redirects');
      } else {
        simpleRequest(response.headers.location).then(resp => {
          followRedirects(resp).then(final => res(final));
        });
      }
    }
    res(response);
  });
}
