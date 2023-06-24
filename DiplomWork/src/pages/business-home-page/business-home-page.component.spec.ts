import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHomePageComponent } from './business-home-page.component';

describe('BusinessHomePageComponent', () => {
  let component: BusinessHomePageComponent;
  let fixture: ComponentFixture<BusinessHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
