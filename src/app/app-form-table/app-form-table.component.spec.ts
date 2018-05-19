
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormTableComponent } from './app-form-table.component';

describe('AppFormTableComponent', () => {
  let component: AppFormTableComponent;
  let fixture: ComponentFixture<AppFormTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFormTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
