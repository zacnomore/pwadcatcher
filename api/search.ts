import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';
import { addCORS } from 'api-utils/cors';

export default (req: NowRequest, res: NowResponse) => {
  const {
    query: { term }
  } = req;

  get(`http://itunes.apple.com/search?media=podcast&term=${term}`, searchResp => {
    let rawData = '';
    searchResp.on('data', (chunk) => { rawData += chunk; });
    searchResp.on('end', () => {
      addCORS(req, res);
      res.json(JSON.parse(rawData));
    });

  });
};

