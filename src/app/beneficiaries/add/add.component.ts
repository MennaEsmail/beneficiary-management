import { Component } from '@angular/core';
import { BeneficiaryService, Beneficiary } from '../../services/beneficiary.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  beneficiary: Beneficiary = { id: 0, name: '', technologies: [], rating: 0 };
  isEditing = false;


  constructor(
    private beneficiaryService: BeneficiaryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL to check if we are editing
    if (id) {
      this.isEditing = true;
      this.beneficiaryService.getBeneficiaryById(id).subscribe((beneficiary) => {
        if (beneficiary) {
          this.beneficiary = { ...beneficiary }; // copy the object to avoid changing the original object
        }
      });
    }
  }

  saveBeneficiary() {
    console.log(this.beneficiary);
    if (this.isEditing) {
      this.beneficiaryService.updateBeneficiary(this.beneficiary);
    } else {
      this.beneficiaryService.addBeneficiary(this.beneficiary);
    }
    this.router.navigate(['/beneficiaries']);
  }
}
