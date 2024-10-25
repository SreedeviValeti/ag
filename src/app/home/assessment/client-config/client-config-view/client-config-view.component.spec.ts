import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfigViewComponent } from './client-config-view.component';

describe('ClientConfigViewComponent', () => {
  let component: ClientConfigViewComponent;
  let fixture: ComponentFixture<ClientConfigViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientConfigViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientConfigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
