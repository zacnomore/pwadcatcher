import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { map, scan, startWith, shareReplay, tap, switchMap } from 'rxjs/operators';
import { IPodcastEpisode } from 'src/app/shared/podcast.model';
import { PlaylistService } from 'src/app/playlist/services/playlist.service';
import { throttle } from 'src/app/shared/utils';
import { StoreService } from 'src/app/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private readonly audio = new Audio();

  private audioActions = new Map<PlayerAction, (el: HTMLAudioElement, params?: number) => void>([
    [PlayerAction.Play, el => el.play()],
    [PlayerAction.Pause, el => el.pause()],
    [PlayerAction.SkipNext, () => this.playlistService.changeEpisode({ indexShift: 1 })],
    [PlayerAction.SkipPrevious, () => this.playlistService.changeEpisode({ indexShift: -1 })],
    [PlayerAction.FastForward, el => el.currentTime += 10],
    [PlayerAction.FastRewind, el => el.currentTime -= 10],
    [PlayerAction.Seek, (el, params) => params ? el.currentTime = params : undefined ]
  ]);

  private storeAudioState = throttle((state: IAudioState, episode: IPodcastEpisode) => {
    this.storeService.setEpisode({
      ...episode,
      lastPlayheadPosition: state.currentTime
    });
  }, 4000);

  public audioState$: Observable<IAudioState> = this.playlistService.currentEpisode$.pipe(
    // Side-effect sets the native audio player
    tap(currentEp => this.loadAudio(currentEp)),
    // Listen to the native player's state
    switchMap((currentEp) => {
      return this.listenToState(this.audio).pipe(
        startWith({
          canPlay: false,
          currentTime: 0,
          duration: NaN,
          isPlaying: false
        } as IAudioState),
        map(audio => ({audio, currentEp}))
      );
    }),
    // Persist playhead state
    tap(({audio, currentEp}) => {
      if(currentEp) {
        this.storeAudioState(audio, currentEp);
      }
    }),
    map(({audio}) => audio),
    shareReplay(1)
  );

  constructor(private playlistService: PlaylistService, private storeService: StoreService) { }

  // TODO: The params thing is a bit silly. It should take additional information typed by what kind of action
  public doAction(actionType: PlayerAction, params?: number): void {
    const action = this.audioActions.get(actionType);
    if (action) {
      action(this.audio, params);
    }
  }

  private loadAudio(episode: IPodcastEpisode | null): void {
    if (episode) {
      this.audio.src = episode.audioUrl;
      this.audio.load();
      if(episode.lastPlayheadPosition) {
        this.audio.currentTime = episode.lastPlayheadPosition;
      }
      this.audio.play();
    } else {
      this.audio.src = '';
    }
  }

  private listenToState(audio: HTMLAudioElement): Observable<IAudioState> {
    const eventPlans: IEventPlanning[] = [
      { name: 'canplay', handler: this.staticHandler({canPlay: true}) },
      { name: 'error', handler: this.staticHandler({ isPlaying: false, canPlay: false }) },
      { name: 'timeupdate', handler: this.buildHandler((a: HTMLAudioElement) => ({ currentTime: a.currentTime })) },
      { name: 'pause', handler: this.staticHandler({ isPlaying: false }) },
      { name: 'playing', handler: this.staticHandler({ isPlaying: true }) },
      { name: 'durationchange', handler: this.buildHandler((a: HTMLAudioElement) => ({ duration: a.duration })) },
      { name: 'ended', handler: this.sideEffect(() => { this.playlistService.endEpisode(); }) }
    ];

    return this.constructHandlerStream(audio, eventPlans).pipe(
        scan<(s: IAudioState) => IAudioState, IAudioState>((acc, handler) => handler(acc), this.getCurrentState(audio))
      );
    }

    private getCurrentState(audio: HTMLAudioElement): IAudioState {
      return {
        currentTime: audio.currentTime,
        duration: audio.duration,
        isPlaying: !audio.paused,
        canPlay: audio.readyState === 4
      };
    }

  private buildHandler(dynamicHandler: (aud: HTMLAudioElement) => Partial<IAudioState>): AudioEventHandler {
    return (pr: IAudioState, e?: Event, a?: HTMLAudioElement) => {
      if (a) {
        return this.staticHandler(dynamicHandler(a))(pr);
      }
      throw new Error(`Audio element no longer defined. STATE: ${pr}, EVENT: ${e}`);
    };
  }

  private staticHandler(change: Partial<IAudioState>): AudioEventHandler {
    return (prev: IAudioState) => ({ ...prev, ...change }) as IAudioState;
  }

  private sideEffect(effect: () => void): AudioEventHandler {
    return (prev: IAudioState) => {
      effect();
      return prev;
    };
  }

  private constructHandlerStream(t: HTMLAudioElement, plans: IEventPlanning[]): Observable<(state: IAudioState) => IAudioState> {
    // TODO: Simplify away
    // tslint:disable-next-line: deprecation
    return merge(...plans.map(plan =>
      fromEvent(t, plan.name).pipe(
        map(event => (state: IAudioState) => plan.handler(state, event, t))
      ))
    );
  }
}

export interface IAudioState {
  isPlaying: boolean;
  canPlay: boolean;
  currentTime: number;
  duration: number;
}

export enum PlayerAction {
  Play,
  Pause,
  SkipNext,
  SkipPrevious,
  FastForward,
  FastRewind,
  Seek
}

type AudioEventHandler = (prev: IAudioState, event?: Event, audio?: HTMLAudioElement) => IAudioState;

interface IEventPlanning {
  name: string;
  handler: AudioEventHandler;
}
