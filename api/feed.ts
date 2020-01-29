import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';
import { get as httpsGet } from 'https';
import { addCORS } from '../api-utils/cors';
import { collectResponse, simpleRequest } from '../api-utils/simple';
import { followRedirects } from '../api-utils/follow-redirect';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { xmlUrl }
  } = req;

  const url = xmlUrl.toString();
  const response = await simpleRequest(url);
  addCORS(req, res);
  res.send(response.rawData);
};

