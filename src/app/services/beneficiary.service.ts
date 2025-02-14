import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface Beneficiary {
  id: number;
  name: string;
  technologies: string[];
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  private beneficiariesSubject = new BehaviorSubject<Beneficiary[]>([]);
beneficiaries$ = this.beneficiariesSubject.asObservable();

  constructor() {
    // Initialize with mock data
    const initialBeneficiaries: Beneficiary[] = [
      { id: 1, name: 'Menna Esmail', technologies: ['Angular', 'RxJS'], rating: 4 },
      { id: 2, name: 'Yassmin Ragaai', technologies: ['React', 'Node.js'], rating: 5 },
      { id: 3, name: 'Sara Saad', technologies: ['Vue', 'Vuex'], rating: 3 },
      { id: 4, name: 'Ahmed Ashour', technologies: ['Angular', 'NgRx'], rating: 4 },
    ];
    this.beneficiariesSubject.next(initialBeneficiaries);
  }

  // Fetch the current list of beneficiaries
  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.beneficiaries$;
  }
  // ge a single beneficiary by ID
  getBeneficiaryById(id: number): Observable<Beneficiary | undefined> {
    return this.beneficiaries$.pipe(
      map((beneficiaries) => beneficiaries.find((b) => b.id === id))
    );
  }
  // Add a new beneficiary to the list
  addBeneficiary(beneficiary: Beneficiary): void {
    const currentData = this.beneficiariesSubject.value;
    this.beneficiariesSubject.next([...currentData, beneficiary]);
  }
  // Update an existing beneficiary in the list
  updateBeneficiary(updatedBeneficiary: Beneficiary): void {
    const currentData = this.beneficiariesSubject.value.map((b) =>
      b.id === updatedBeneficiary.id ? updatedBeneficiary : b
    );
    this.beneficiariesSubject.next(currentData);
  }
  // Delete a beneficiary from the list
  deleteBeneficiary(id: number): void {
    const updatedList = this.beneficiariesSubject.value.filter(b => b.id !== id);
    this.beneficiariesSubject.next(updatedList);
  }
}
