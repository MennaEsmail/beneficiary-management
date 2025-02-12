import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { Observable } from 'rxjs';

interface Beneficiary {
  id: number;
  name: string;
  technologies: string[];
  rating: number;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  beneficiaries$!: Observable<Beneficiary[]>; //I added ! to tell the compiler that this variable it will be assigned before being used
                                              //$I added to clearly indicate that the variable is an Observable stream.

  constructor(private beneficiaryService: BeneficiaryService) {}

 updateRating(beneficiary: Beneficiary, newRating: number) {
  beneficiary.rating = newRating;
}
  ngOnInit(): void {
    this.beneficiaries$ = this.beneficiaryService.getBeneficiaries();
  }

}
