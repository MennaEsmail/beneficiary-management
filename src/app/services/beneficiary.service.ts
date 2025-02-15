import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
export interface Beneficiary {
  id: number;
  name: string;
  technologies: string[];
  rating: number;
  budget?: number;
  status: 'pending' | 'approved';
  age?: number;
}

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  private beneficiariesSubject = new BehaviorSubject<Beneficiary[]>([]);
beneficiaries$ = this.beneficiariesSubject.asObservable();



  constructor(private messageService: MessageService) {
    // Initialize with mock data
    const initialBeneficiaries: Beneficiary[] = [
      { id: 1, name: 'Menna Esmail', technologies: ['Angular', 'RxJS'], rating: 4, status: 'approved', age: 25, budget: 1000 },
      { id: 2, name: 'Yassmin Ragaai', technologies: ['React', 'Node.js'], rating: 5, status: 'approved', age: 30, budget: 2000 },
      { id: 3, name: 'Sara Saad', technologies: ['Vue', 'Vuex'], rating: 3, status: 'pending', age: 35, budget: 3000 },
      { id: 4, name: 'Ahmed Ashour', technologies: ['Angular', 'NgRx'], rating: 4, status: 'approved', age: 40, budget: 4000 },
      { id: 5, name: 'Mohamed Ali', technologies: ['React', 'Redux'], rating: 5, status: 'approved', age: 45, budget: 5000 },
    ];
    this.beneficiariesSubject.next(initialBeneficiaries);
  }

  // Fetch the current list of beneficiaries
  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.beneficiaries$.pipe(
      map((beneficiaries) => beneficiaries.filter(b => b.status === 'approved'))
    );
  }
  // only returns pending beneficiaries
  getPendingBeneficiaries(): Observable<Beneficiary[]> {
    return this.beneficiaries$.pipe(
      map((beneficiaries) => beneficiaries.filter(b => b.status === 'pending'))
    );
  }
  // ge a single beneficiary by ID
  getBeneficiaryById(id: number): Observable<Beneficiary | undefined> {
    return this.beneficiaries$.pipe(
      map((beneficiaries) => beneficiaries.find((b) => b.id === id))
    );
  }
  // Add a new beneficiary to the list
  addBeneficiary(beneficiary: Partial<Beneficiary>): void {
    const currentBeneficiaries = this.beneficiariesSubject.value;
  
    //Get the highest ID from the current list, default to 0 if empty
    const highestId = currentBeneficiaries.reduce((max, b) => b.id > max ? b.id : max, 0);
    const newId = highestId + 1; // Increment the highest ID to get a new ID
  
    const newBeneficiary: Beneficiary = { 
      id: newId,  //Ensuring unique ID
      name: beneficiary.name || '', // Ensure name is provided
      technologies: beneficiary.technologies || [], // Ensure technologies are provided
      rating: beneficiary.rating || 0, // Ensure rating is provided
      status: 'pending', // Default status is 'pending'
      budget: beneficiary.budget,
      age: beneficiary.age
    };
  

  
    this.beneficiariesSubject.next([...currentBeneficiaries, newBeneficiary]);
  
    this.messageService.add({
      severity: 'info',
      summary: 'Pending Approval',
      detail: `Beneficiary ${newBeneficiary.name} is waiting for admin approval.`,
    });
  }
  
  

  approveBeneficiary(id: number): void {
    let currentBeneficiaries = this.beneficiariesSubject.value;
    
    // Find the beneficiary to approve
    const beneficiaryIndex = currentBeneficiaries.findIndex(b => b.id === id);
    if (beneficiaryIndex === -1) return; // If not found, return
  
    // Update the status to approved
    currentBeneficiaries = currentBeneficiaries.map(b => 
      b.id === id ? { ...b, status: 'approved' } : b
    );
  
    // Emit the updated list
    this.beneficiariesSubject.next(currentBeneficiaries);
  
    // Find the newly approved beneficiary for messaging
    const approvedBeneficiary = currentBeneficiaries.find(b => b.id === id);
  
    if (approvedBeneficiary) {
      this.messageService.add({
        severity: 'success',
        summary: 'Approved',
        detail: `Beneficiary ${approvedBeneficiary.name} is now approved.`,
      });
    }
  }
  

  // Update an existing beneficiary in the list
  updateBeneficiary(updatedBeneficiary: Beneficiary): void {
    let currentBeneficiaries = this.beneficiariesSubject.value.map((b) => {
      if (b.id === updatedBeneficiary.id) {
        return { ...b, ...updatedBeneficiary }; 
      }
      return b;
    });
  
    this.beneficiariesSubject.next(currentBeneficiaries);
  
    const updated = currentBeneficiaries.find((b) => b.id === updatedBeneficiary.id);
  
    if (updated) {
      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: `Beneficiary ${updated.name} updated successfully`,
      });
    }
  }
  
  // Delete a beneficiary from the list
  deleteBeneficiary(id: number): void {
    const updatedList = this.beneficiariesSubject.value.filter(b => b.id !== id);
    this.beneficiariesSubject.next(updatedList);
    this.messageService.add({
      severity: 'success',
      summary: 'Deleted',
      detail: `Beneficiary deleted successfully`,
    });
  }
}
