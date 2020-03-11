import { TestBed } from '@angular/core/testing';

import { RssReaderService } from './rss-reader.service';
import { HttpClientModule } from '@angular/common/http';

describe('RssReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: RssReaderService = TestBed.inject(RssReaderService);
    expect(service).toBeTruthy();
  });
});
