import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepModelComponent } from './step-model.component';

describe('StepModelComponent', () => {
  let component: StepModelComponent;
  let fixture: ComponentFixture<StepModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
