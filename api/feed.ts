import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';
import { get as httpsGet } from 'https';
import { addCORS } from '../api-utils/cors';
import { collectResponse } from '../api-utils/simple';
import { followRedirects } from '../api-utils/follow-redirect';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { xmlUrl }
  } = req;

  const url = xmlUrl.toString();
  const getMethod = url.includes('https') ? httpsGet : get;

  getMethod(url, async incoming => {
    const response = await collectResponse(incoming);
    followRedirects(response).then(r => {
        addCORS(req, res);
        res.send(r.rawData);
      });
    });
};

