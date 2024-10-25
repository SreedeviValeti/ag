import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsAppComponent } from './metrics-app.component';

describe('MetricsAppComponent', () => {
  let component: MetricsAppComponent;
  let fixture: ComponentFixture<MetricsAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
