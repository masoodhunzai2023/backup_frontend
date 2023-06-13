import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDialogComponentComponent } from './location-dialog-component.component';

describe('LocationDialogComponentComponent', () => {
  let component: LocationDialogComponentComponent;
  let fixture: ComponentFixture<LocationDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
