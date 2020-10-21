import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PodcastContainerComponent } from './podcast-container.component';

describe('PodcastContainerComponent', () => {
  let component: PodcastContainerComponent;
  let fixture: ComponentFixture<PodcastContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastContainerComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
