import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { map, scan, tap, startWith, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio = new Audio();
  private audioActions = new Map<PlayerAction, (el: HTMLAudioElement) => void>([
    [PlayerAction.Play, el => el.play()],
    [PlayerAction.Pause, el => el.pause()],
    [PlayerAction.SkipNext, () => {}],
    [PlayerAction.SkipPrevious, () => {}],
    [PlayerAction.FastForward, el => el.currentTime += 10],
    [PlayerAction.FastRewind, el => el.currentTime -= 10]
  ]);

  public audioState$: Observable<IAudioState> = this.listenToState(this.audio).pipe(
    startWith({
      canPlay: false,
      currentTime: 0,
      duration: NaN,
      isPlaying: false
    } as IAudioState),
    shareReplay(1),
    tap(console.log)
  );

  public doAction(key: PlayerAction): void {
    const action = this.audioActions.get(key);
    if (action) {
      action(this.audio);
    }
  }


  public updateSource(url: string): void {
    this.audio.src = url;
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
