import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';
import { addCORS } from '../api-utils/cors';

export default (req: NowRequest, res: NowResponse) => {
  const {
    query: { xmlUrl }
  } = req;

  get(xmlUrl.toString().replace('https://', 'http://'), rawFeed => {
    let rawData = '';
    rawFeed.on('data', (chunk) => { rawData += chunk; });
    rawFeed.on('end', () => {

      addCORS(req, res);
      res.send(rawData);
    });
  });
};

