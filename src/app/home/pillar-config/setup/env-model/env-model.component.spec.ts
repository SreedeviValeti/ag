import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvModelComponent } from './env-model.component';

describe('EnvModelComponent', () => {
  let component: EnvModelComponent;
  let fixture: ComponentFixture<EnvModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
