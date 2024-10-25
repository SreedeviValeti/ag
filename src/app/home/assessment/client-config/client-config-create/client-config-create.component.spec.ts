import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfigCreateComponent } from './client-config-create.component';

describe('ClientConfigCreateComponent', () => {
  let component: ClientConfigCreateComponent;
  let fixture: ComponentFixture<ClientConfigCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientConfigCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientConfigCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
