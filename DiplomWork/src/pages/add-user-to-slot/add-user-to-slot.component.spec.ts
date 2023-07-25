import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToSlotComponent } from './add-user-to-slot.component';

describe('AddUserToSlotComponent', () => {
  let component: AddUserToSlotComponent;
  let fixture: ComponentFixture<AddUserToSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
