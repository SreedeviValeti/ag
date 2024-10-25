import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncLoaderComponent } from './async-loader.component';

describe('AsyncLoaderComponent', () => {
  let component: AsyncLoaderComponent;
  let fixture: ComponentFixture<AsyncLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
