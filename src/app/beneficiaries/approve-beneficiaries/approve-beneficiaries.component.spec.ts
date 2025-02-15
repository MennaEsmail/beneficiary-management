import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBeneficiariesComponent } from './approve-beneficiaries.component';

describe('ApproveBeneficiariesComponent', () => {
  let component: ApproveBeneficiariesComponent;
  let fixture: ComponentFixture<ApproveBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveBeneficiariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
