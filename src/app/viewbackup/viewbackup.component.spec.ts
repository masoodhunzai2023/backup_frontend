import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbackupComponent } from './viewbackup.component';

describe('ViewbackupComponent', () => {
  let component: ViewbackupComponent;
  let fixture: ComponentFixture<ViewbackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbackupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
