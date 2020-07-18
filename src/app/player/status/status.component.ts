import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit {
  currentArtwork$ = this.playlistService.currentEpisode$.pipe(
    map(currentEpisode => currentEpisode?.thumbnail),
    map(thumbs => thumbs || { small: { src: undefined }}),
    map(images => images.small.src)
  );

  currentEpisodeName$ = this.playlistService.currentEpisode$.pipe(
    map(currentEpisode => currentEpisode?.title)
  );

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
  }

}
