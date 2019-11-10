import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';

export default (req: NowRequest, res: NowResponse) => {
  const {
    query: { term }
  } = req;

  get(`http://itunes.apple.com/search?media=podcast&term=${term}`, searchResp => {
    let rawData = '';
    searchResp.on('data', (chunk) => { rawData += chunk; });
    searchResp.on('end', () => {
      res.send(JSON.parse(rawData));
    });

  });
};

