import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { Observable, Subject } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


interface Beneficiary {
  id: number;
  name: string;
  technologies: string[];
  rating: number;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ConfirmationService],
})
export class ListComponent implements OnInit {
  beneficiaries$!: Observable<Beneficiary[]>; //I added ! to tell the compiler that this variable it will be assigned before being used
                                              //$I added to clearly indicate that the variable is an Observable stream.
  filterText: string = '';  // search input
  sortField: 'budget' = 'budget'; // sorting field
  sortOrder: 'asc' | 'desc' = 'asc'; // default order
  searchTerm = new Subject<string>(); // for search
  searchText: string = '';
constructor(
    private beneficiaryService: BeneficiaryService,
    private confirmationService: ConfirmationService
  ) {}
  @ViewChild('searchInput') searchInput!: ElementRef;

  confirmDelete(beneficiary: Beneficiary) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${beneficiary.name}?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.beneficiaryService.deleteBeneficiary(beneficiary.id);
      },
    });
  }
  clearSearch() {
    this.filterText = '';
  }

  // Change sorting field
  changeSort(field:'budget') {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

 updateRating(beneficiary: Beneficiary, newRating: number) {
  beneficiary.rating = newRating;
}
  ngOnInit(): void {
    this.beneficiaries$ = this.beneficiaryService.getBeneficiaries();
       // apply debounce on search
       this.searchTerm.pipe(
        debounceTime(500), // wait 500ms after the last input
        distinctUntilChanged() //only execute if the value changed
      ).subscribe(term => {
        this.searchText = term;
      });
  }


  onSearchChange(term: string) {
    this.searchTerm.next(term);
  }

}
