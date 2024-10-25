import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptModelComponent } from './script-model.component';

describe('ScriptModelComponent', () => {
  let component: ScriptModelComponent;
  let fixture: ComponentFixture<ScriptModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
