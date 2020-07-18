import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBayComponent } from './player-bay.component';

describe('PlayerBayComponent', () => {
  let component: PlayerBayComponent;
  let fixture: ComponentFixture<PlayerBayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
