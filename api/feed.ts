import { NowRequest, NowResponse } from '@now/node';
import { get } from 'http';
import { xml2js, Element as XMLElement } from 'xml-js';
import { IPodcastFeed, IPodcastEpisode } from '../src/app/shared/models/podcast.model';

export default (req: NowRequest, res: NowResponse) => {
  const {
    query: { xmlUrl }
  } = req;

  get(xmlUrl.toString().replace('https://', 'http://'), rawFeed => {
    let rawData = '';
    rawFeed.on('data', (chunk) => { rawData += chunk; });
    rawFeed.on('end', () => {
      const { elements: root } = xml2js(rawData) as XMLElement;
      const rss: XMLElement = (root || []).find(el => el.name === 'rss') || {elements: []};
      const {elements: channel } = (rss.elements || []).find(el => el.name === 'channel') || { elements: []};

      const episodes: IPodcastEpisode[] | undefined = (channel || []).filter(
        el => el.name === 'item'
      ).map(({ elements }) => {
        console.log(elements);
        const {elements: titleProps} = (elements || []).find(el => el.name === 'title') || {elements: []};
        const { text: title = '' } = (titleProps || []).find(el => el.text !== undefined) || { text: '' };

        const defaultUrl = { url: '' };
        const { attributes: enclosure = defaultUrl } = (elements || []).find(el => el.name === 'enclosure') || { attributes: defaultUrl };
        const audioUrl = (enclosure.url || '').toString();

        return {
          title: title.toString(),
          audioUrl,
        };
      });

      res.json({
        episodes
      });
    });
  });
};

