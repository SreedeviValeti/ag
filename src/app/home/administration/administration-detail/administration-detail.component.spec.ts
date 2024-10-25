import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationDetailComponent } from './administration-detail.component';

describe('AdministrationDetailComponent', () => {
  let component: AdministrationDetailComponent;
  let fixture: ComponentFixture<AdministrationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
