import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfigComponent } from './client-config.component';

describe('ClientConfigComponent', () => {
  let component: ClientConfigComponent;
  let fixture: ComponentFixture<ClientConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
