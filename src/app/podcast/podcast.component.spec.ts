import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastComponent } from './podcast.component';
import { OverviewModule } from './presentations/overview/overview.module';

describe('PodcastComponent', () => {
  let component: PodcastComponent;
  let fixture: ComponentFixture<PodcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastComponent],
      imports: [OverviewModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
