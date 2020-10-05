import { NowRequest, NowResponse } from '@vercel/node';
import { addCORS } from '../api-utils/cors';
import { simpleRequest } from '../api-utils/simple';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { xmlUrl }
  } = req;

  const url = xmlUrl.toString();
  const response = await simpleRequest(url);
  addCORS(req, res);
  res.send(response.rawData);
};

