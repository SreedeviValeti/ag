import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadcacheComponent } from './loadcache.component';

describe('LoadcacheComponent', () => {
  let component: LoadcacheComponent;
  let fixture: ComponentFixture<LoadcacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadcacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadcacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
