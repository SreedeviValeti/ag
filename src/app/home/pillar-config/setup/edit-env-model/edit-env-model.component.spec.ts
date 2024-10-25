import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEnvModelComponent } from './edit-env-model.component';


describe('EditEnvModelComponent', () => {
  let component: EditEnvModelComponent;
  let fixture: ComponentFixture<EditEnvModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnvModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnvModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
