import { TestBed } from '@angular/core/testing';

import { PodcastService } from './podcast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PodcastService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PodcastService = TestBed.inject(PodcastService);
    expect(service).toBeTruthy();
  });
});
