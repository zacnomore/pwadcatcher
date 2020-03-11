import { TestBed } from '@angular/core/testing';

import { AudioPlayerService } from './audio-player.service';

describe('AudioPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioPlayerService = TestBed.inject(AudioPlayerService);
    expect(service).toBeTruthy();
  });
});
