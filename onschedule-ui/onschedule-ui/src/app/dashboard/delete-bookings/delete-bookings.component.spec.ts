import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookingsComponent } from './delete-bookings.component';

describe('DeleteBookingsComponent', () => {
  let component: DeleteBookingsComponent;
  let fixture: ComponentFixture<DeleteBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
