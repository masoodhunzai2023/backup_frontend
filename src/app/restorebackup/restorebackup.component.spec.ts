import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorebackupComponent } from './restorebackup.component';

describe('RestorebackupComponent', () => {
  let component: RestorebackupComponent;
  let fixture: ComponentFixture<RestorebackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestorebackupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorebackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
