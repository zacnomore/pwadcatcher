import { TestBed } from '@angular/core/testing';

import { RssReaderService } from './rss-reader.service';
import { HttpClientModule } from '@angular/common/http';

describe('RssReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: RssReaderService = TestBed.get(RssReaderService);
    expect(service).toBeTruthy();
  });

  it('should read a feed into JSON', async () => {
    const service: RssReaderService = TestBed.get(RssReaderService);
    service.readFeed('https://feeds.megaphone.fm/replyall').subscribe();
  });
});
