import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InframetricsComponent } from './inframetrics.component';

describe('InframetricsComponent', () => {
  let component: InframetricsComponent;
  let fixture: ComponentFixture<InframetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InframetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InframetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
