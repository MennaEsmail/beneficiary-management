import { Component, ViewChild, ElementRef } from '@angular/core';
import { BeneficiaryService, Beneficiary } from '../../services/beneficiary.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approve-beneficiaries',
  templateUrl: './approve-beneficiaries.component.html',
  styleUrl: './approve-beneficiaries.component.scss',
  standalone: true,
  imports: [CurrencyPipe, CommonModule]
})
export class ApproveBeneficiariesComponent {
  pendingBeneficiaries: Beneficiary[] = [];

  @ViewChild('confirmMessage') confirmMessage!: ElementRef; // DOM Manipulation - Show Confirmation Message

  constructor(private beneficiaryService: BeneficiaryService) {}

  ngOnInit() {
    this.loadPendingBeneficiaries();
  }


  loadPendingBeneficiaries() {
    this.beneficiaryService.getPendingBeneficiaries().subscribe((beneficiaries) => {
      this.pendingBeneficiaries = beneficiaries;
    });
  }

  approveBeneficiary(id: number) {
    this.beneficiaryService.approveBeneficiary(id);
    this.loadPendingBeneficiaries(); 
  }

}
