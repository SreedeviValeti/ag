import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PillarConfigComponent } from './pillar-config.component';

describe('PillarConfigComponent', () => {
  let component: PillarConfigComponent;
  let fixture: ComponentFixture<PillarConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PillarConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PillarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
