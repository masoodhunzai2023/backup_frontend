import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakebackupComponent } from './takebackup.component';

describe('TakebackupComponent', () => {
  let component: TakebackupComponent;
  let fixture: ComponentFixture<TakebackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakebackupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakebackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
