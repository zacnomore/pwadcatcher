import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AudioPlayerService, PlayerAction } from '../services/audio-player.service';

import { ControlsComponent } from './controls.component';

fdescribe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;
  let audioPlayerSpy: AudioPlayerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsComponent ],
      providers: [{ provide: AudioPlayerService, useFactory: () =>
        jasmine.createSpyObj('AudioPlayerService', [
          'doAction'
        ], {
          audioState$: of()
        })
      } ]
    }).compileComponents();

    audioPlayerSpy = TestBed.inject(AudioPlayerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the user presses play', () => {
    it('should trigger the play action when paused', () => {
      component.togglePlay(false);
      expect(audioPlayerSpy.doAction).toHaveBeenCalledWith(PlayerAction.Play);
    });

    it('should trigger the pause action when playing', () => {
      component.togglePlay(true);
      expect(audioPlayerSpy.doAction).toHaveBeenCalledWith(PlayerAction.Pause);
    });
  });
});
