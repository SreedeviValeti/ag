import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingBounceComponent } from './rolling-bounce.component';

describe('RollingBounceComponent', () => {
  let component: RollingBounceComponent;
  let fixture: ComponentFixture<RollingBounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollingBounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollingBounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
