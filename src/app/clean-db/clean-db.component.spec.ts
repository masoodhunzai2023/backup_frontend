import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanDbComponent } from './clean-db.component';

describe('CleanDbComponent', () => {
  let component: CleanDbComponent;
  let fixture: ComponentFixture<CleanDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
