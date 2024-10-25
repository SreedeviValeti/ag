import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfigEditComponent } from './client-config-edit.component';

describe('ClientConfigEditComponent', () => {
  let component: ClientConfigEditComponent;
  let fixture: ComponentFixture<ClientConfigEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientConfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
