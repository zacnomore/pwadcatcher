import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, BehaviorSubject } from 'rxjs';
import { map, scan, startWith, shareReplay } from 'rxjs/operators';
import { IPodcastEpisode } from 'src/app/shared/models/podcast.model';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private readonly audio = new Audio();
  private playlist: IPodcastEpisode[] = [];
  private currentEpisodeIndex = -1;

  private audioActions = new Map<PlayerAction, (el: HTMLAudioElement) => void>([
    [PlayerAction.Play, el => el.play()],
    [PlayerAction.Pause, el => el.pause()],
    [PlayerAction.SkipNext, () => this.playEpisode(this.playlist[this.currentEpisodeIndex + 1])],
    [PlayerAction.SkipPrevious, () => this.playEpisode(this.playlist[this.currentEpisodeIndex + 1])],
    [PlayerAction.FastForward, el => el.currentTime += 10],
    [PlayerAction.FastRewind, el => el.currentTime -= 10]
  ]);

  private currentEpisodeBS = new BehaviorSubject<IPodcastEpisode | null>(null);
  public currentEpisode$: Observable<IPodcastEpisode | null> = this.currentEpisodeBS.pipe();

  public audioState$: Observable<IAudioState> = this.listenToState(this.audio).pipe(
    startWith({
      canPlay: false,
      currentTime: 0,
      duration: NaN,
      isPlaying: false
    } as IAudioState),
    shareReplay(1)
  );

  public doAction(key: PlayerAction): void {
    const action = this.audioActions.get(key);
    if (action) {
      action(this.audio);
    }
  }

  public addToPlaylist(episode: IPodcastEpisode) {
    this.playlist.push(episode);
  }

  public removeFromPlaylist({ index, episode }: { index: undefined; episode: IPodcastEpisode; } | { index: number; episode: undefined; }) {
    this.playlist = this.playlist.filter((ep, ind) => {
      return ep !== episode && ind !== index;
    });
  }

  public playEpisode(episode: IPodcastEpisode): void {
    this.playlist.unshift(episode);
    this.currentEpisodeIndex = 0;
    this.currentEpisodeBS.next(episode);
    this.audio.src = episode.audioUrl;
    this.audio.load();
    this.audio.play();
  }

  private listenToState(audio: HTMLAudioElement): Observable<IAudioState> {
    const eventPlans: IEventPlanning[] = [
      { name: 'canplay', handler: this.staticHandler({canPlay: true}) },
      { name: 'error', handler: this.staticHandler({ isPlaying: false, canPlay: false }) },
      { name: 'timeupdate', handler: this.buildHandler((a: HTMLAudioElement) => ({ currentTime: a.currentTime })) },
      { name: 'pause', handler: this.staticHandler({ isPlaying: false }) },
      { name: 'playing', handler: this.staticHandler({ isPlaying: true }) },
      { name: 'durationchange', handler: this.buildHandler((a: HTMLAudioElement) => ({ duration: a.duration })) }
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
  FastRewind
}


type AudioEventHandler = (prev: IAudioState, event?: Event, audio?: HTMLAudioElement) => IAudioState;

interface IEventPlanning {
  name: string;
  handler: AudioEventHandler;
}
