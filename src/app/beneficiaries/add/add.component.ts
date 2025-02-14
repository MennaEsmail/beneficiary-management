import { Component } from '@angular/core';
import { BeneficiaryService, Beneficiary } from '../../services/beneficiary.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  beneficiary: Beneficiary = { id: 0, name: '', technologies: [], rating: 3 };
  isEditing = false;
  successMessage = false;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    if (id) {
      this.isEditing = true;
      this.beneficiaryService.getBeneficiaryById(id).subscribe((beneficiary) => {
        if (beneficiary) {
          this.beneficiary = { ...beneficiary }; // Fill form with existing data
        }
      });
    }
  }

  saveBeneficiary() {
    if (this.isEditing) {
      this.beneficiaryService.updateBeneficiary(this.beneficiary);
    } else {
      this.beneficiaryService.addBeneficiary(this.beneficiary);
    }

    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
      this.router.navigate(['/beneficiaries']);
    }, 2000);
  }
}
