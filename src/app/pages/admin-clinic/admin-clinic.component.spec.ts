import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClinicComponent } from './admin-clinic.component';

describe('AdminClinicComponent', () => {
  let component: AdminClinicComponent;
  let fixture: ComponentFixture<AdminClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClinicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
