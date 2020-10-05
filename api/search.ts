import { NowRequest, NowResponse } from '@vercel/node';
import { addCORS } from '../api-utils/cors';
import { simpleRequest } from '../api-utils/simple';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { term }
  } = req;

  const searchResults = await simpleRequest(`http://itunes.apple.com/search?media=podcast&term=${term}`);
  addCORS(req, res);
  res.json(JSON.parse(searchResults.rawData));
};

