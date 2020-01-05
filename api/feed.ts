import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';
import { xml2js, Element as XMLElement } from 'xml-js';
import { IPodcastFeed } from '../src/app/shared/models/podcast.model';

export default (req: NowRequest, res: NowResponse) => {
  const {
    query: { xmlUrl }
  } = req;

  get(xmlUrl.toString(), rawFeed => {
    let rawData = '';
    rawFeed.on('data', (chunk) => { rawData += chunk; });
    rawFeed.on('end', () => {
      const xmlJson = xml2js(rawData) as XMLElement;
      // const mappedFeed = xmlJson.elements.;
      res.json(xmlJson);
    });
  });
};

