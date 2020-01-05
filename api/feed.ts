import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';
import { xml2js } from 'xml-js';
import { IPodcastFeed } from '../src/app/shared/models/podcast.model';

export default (req: NowRequest, res: NowResponse) => {
  const {
    query: { xmlUrl }
  } = req;

  get(xmlUrl.toString(), feed => {
    let rawData = '';
    feed.on('data', (chunk) => { rawData += chunk; });
    feed.on('end', () => {
      const feedJson = xml2js(rawData);
      res.json(feedJson);
    });
  });
};

