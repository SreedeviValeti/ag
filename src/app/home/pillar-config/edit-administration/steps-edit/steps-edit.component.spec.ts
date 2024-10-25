import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsEditComponent } from './steps-edit.component';

describe('StepsEditComponent', () => {
  let component: StepsEditComponent;
  let fixture: ComponentFixture<StepsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
