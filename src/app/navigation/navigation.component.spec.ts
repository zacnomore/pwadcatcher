import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { expectToBeDumb } from 'src/test-utils/dumb-component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a dumb component', () => {
    expectToBeDumb(component);
  });
});
