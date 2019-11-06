import { TestBed } from '@angular/core/testing';

import { RssReaderService } from './rss-reader.service';

describe('RssReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RssReaderService = TestBed.get(RssReaderService);
    expect(service).toBeTruthy();
  });

  it('should read a feed into JSON', async () => {
    const service: RssReaderService = TestBed.get(RssReaderService);
    return expectAsync(service.readFeed('https://feeds.megaphone.fm/replyall')).toBeResolved();
  });
});
