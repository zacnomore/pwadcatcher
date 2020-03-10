import { ISimpleResponse, simpleRequest } from '../api-utils/simple';
export async function followRedirects(response: ISimpleResponse, numberToFollow: number = 2): Promise<ISimpleResponse> {
    // Is a redirect
    if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400) {
      // Cannot follow
      if (!response.headers.location) {
        throw new Error('No redirect location');
      } else if (numberToFollow <= 0) {
        throw new Error('Too many redirects');
      } else {
        const redirectedResponse = await simpleRequest(response.headers.location);
        return followRedirects(redirectedResponse);
      }
    }
    return response;
}
