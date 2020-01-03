import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';

export default (req: NowRequest, res: NowResponse) => {
  const {
    query: { collectionId }
  } = req;

  get(`http://itunes.apple.com/search?media=podcast&term=${collectionId}`, searchResp => {
    let rawData = '';
    searchResp.on('data', (chunk) => { rawData += chunk; });
    searchResp.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      const { results } = JSON.parse(rawData);
      res.json(results[0]);
    });

  });
};

