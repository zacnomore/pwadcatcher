import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsComponent } from './subscriptions.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SubscriptionsComponent', () => {
  let component: SubscriptionsComponent;
  let fixture: ComponentFixture<SubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionsComponent],
      imports: [
        HttpClientTestingModule,
        MatGridListModule,
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
