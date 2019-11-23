import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastListComponent } from './podcast-list.component';
import { MatListModule } from '@angular/material/list';

describe('PodcastListComponent', () => {
  let component: PodcastListComponent;
  let fixture: ComponentFixture<PodcastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastListComponent],
      imports: [ MatListModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
