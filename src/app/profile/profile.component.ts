import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryService, Beneficiary } from '../services/beneficiary.service';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  beneficiary: Beneficiary | null = null;
  isSelfProfile: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private beneficiaryService: BeneficiaryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const currentUser = this.authService.getCurrentUser();
      if (id && currentUser) {
        this.isSelfProfile = id === currentUser.id;
      }
      if (id) {
        // Fetch a specific user's profile
        this.beneficiaryService.getBeneficiaryById(id).subscribe(beneficiary => {
          this.beneficiary = beneficiary || null;
        });
      } else {
        //If no ID, load the logged-in user's profile
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.beneficiaryService.getBeneficiaryById(currentUser.id).subscribe(beneficiary => {
            this.beneficiary = beneficiary || null;
          });
        }
      }
    });
  }
}
