import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { User } from './auth.service';

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
    this.loadBeneficiaries();
    this.ensureAllBeneficiariesAreUsers();
  }

  //   Load beneficiaries from localStorage (or initialize)
   loadBeneficiaries(): void {
    const savedBeneficiaries = JSON.parse(localStorage.getItem('beneficiaries') || 'null');
    if (savedBeneficiaries) {
      this.beneficiariesSubject.next(savedBeneficiaries);
    } else {
      const initialBeneficiaries: Beneficiary[] = [
        { id: 1, name: 'Menna Esmail', technologies: ['Angular', 'RxJS'], rating: 4, status: 'approved', age: 25, budget: 1000 },
        { id: 2, name: 'Yassmin Ragaai', technologies: ['React', 'Node.js'], rating: 5, status: 'approved', age: 30, budget: 2000 },
        { id: 3, name: 'Sara Saad', technologies: ['Vue', 'Vuex'], rating: 5, status: 'pending', age: 35, budget: 3000 },
        { id: 4, name: 'Ahmed Ashour', technologies: ['Angular', 'NgRx'], rating: 4, status: 'approved', age: 40, budget: 4000 },
        { id: 5, name: 'Mohamed Ali', technologies: ['React', 'Redux'], rating: 5, status: 'approved', age: 45, budget: 5000 },
      ];
      this.beneficiariesSubject.next(initialBeneficiaries);
      this.saveBeneficiaries();
    }
  }

  //   Ensure all beneficiaries exist as users
  private ensureAllBeneficiariesAreUsers(): void {
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const beneficiaries = this.beneficiariesSubject.value;

    beneficiaries.forEach(beneficiary => {
      if (!users.some(user => user.id === beneficiary.id)) {
        users.push({
          id: beneficiary.id,
          name: beneficiary.name,
          email: `${beneficiary.name.toLowerCase().replace(/\s/g, '')}@example.com`,
          password: 'password123',
          role: 'beneficiary'
        });
      }
    });

    localStorage.setItem('users', JSON.stringify(users));
  }

  //   Fetch only approved beneficiaries
  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.beneficiaries$.pipe(map(beneficiaries => beneficiaries.filter(b => b.status === 'approved')));
  }

  //   Fetch pending beneficiaries
  getPendingBeneficiaries(): Observable<Beneficiary[]> {
    return this.beneficiaries$.pipe(map(beneficiaries => beneficiaries.filter(b => b.status === 'pending')));
  }

  //   Get a single beneficiary
  getBeneficiaryById(id: number): Observable<Beneficiary | undefined> {
    console.log(id);
    console.log(this.beneficiaries$);
    return this.beneficiaries$.pipe(map(beneficiaries => beneficiaries.find(b => b.id === id)));
  }

  //   Add a new beneficiary & create user
  addBeneficiary(beneficiary: Partial<Beneficiary>): void {
    let currentBeneficiaries = this.beneficiariesSubject.value;
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    //   Get the highest ID and increment
    const newId = this.getNextUniqueId();

    const newBeneficiary: Beneficiary = { 
      id: newId,
      name: beneficiary.name || '',
      technologies: beneficiary.technologies || [],
      rating: beneficiary.rating || 3,
      status: 'pending',
      budget: beneficiary.budget,
      age: beneficiary.age
    };

    this.beneficiariesSubject.next([...currentBeneficiaries, newBeneficiary]);
    this.saveBeneficiaries();

    this.messageService.add({
      severity: 'info',
      summary: 'Pending Approval',
      detail: `Beneficiary ${newBeneficiary.name} is waiting for admin approval.`,
    });

    this.ensureBeneficiaryUser(newBeneficiary, users);
    window.dispatchEvent(new Event('storage'));
  }

  //   Ensure a single beneficiary exists as a user
  private ensureBeneficiaryUser(beneficiary: Beneficiary, users: User[]): void {
    const existingUser = users.find(user => user.id === beneficiary.id);
    if (!existingUser) {
      users.push({
        id: beneficiary.id,
        name: beneficiary.name,
        email: `${beneficiary.name.toLowerCase().replace(/\s/g, '')}@example.com`,
        password: 'password123',
        role: 'beneficiary'
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  //   Approve a beneficiary & ensure they're in users
  approveBeneficiary(id: number): void {
    let currentBeneficiaries = this.beneficiariesSubject.value;
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const beneficiaryIndex = currentBeneficiaries.findIndex(b => b.id === id);
    if (beneficiaryIndex === -1) return;

    currentBeneficiaries = currentBeneficiaries.map(b => 
      b.id === id ? { ...b, status: 'approved' as 'approved' } : b
    );

    this.beneficiariesSubject.next(currentBeneficiaries);
    this.saveBeneficiaries();

    const approvedBeneficiary = currentBeneficiaries.find(b => b.id === id);
    if (approvedBeneficiary) {
        this.ensureBeneficiaryUser(approvedBeneficiary, users);

        this.messageService.add({
            severity: 'success',
            summary: 'Approved',
            detail: `Beneficiary ${approvedBeneficiary.name} is now approved.`,
        });

        //   Refresh UI after approval
        window.dispatchEvent(new Event('storage'));
    }
}

  //   Delete a beneficiary & remove from users
  deleteBeneficiary(id: number): void {
    const updatedList = this.beneficiariesSubject.value.filter(b => b.id !== id);
    this.beneficiariesSubject.next(updatedList);
    this.saveBeneficiaries();

    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(users));

    this.messageService.add({
      severity: 'success',
      summary: 'Deleted',
      detail: `Beneficiary deleted successfully`,
    });
  }

  //   Update the rating of a beneficiary
  updateBeneficiaryRating(id: number, newRating: number): void {
    const updatedBeneficiaries = this.beneficiariesSubject.value.map(b =>
      b.id === id ? { ...b, rating: newRating } : b
    );
    this.beneficiariesSubject.next(updatedBeneficiaries);
    this.saveBeneficiaries();
    window.dispatchEvent(new Event('storage'));
  }

  //   Save beneficiaries to local storage
  private saveBeneficiaries(): void {
    localStorage.setItem('beneficiaries', JSON.stringify(this.beneficiariesSubject.value));
  }

  //   Generate a unique ID across beneficiaries & users
  private getNextUniqueId(): number {
    let beneficiaries = this.beneficiariesSubject.value;
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const maxId = Math.max(
      ...beneficiaries.map(b => b.id ?? 0), 
      ...users.map(u => u.id ?? 0)
    );

    return maxId + 1;
  }
  updateBeneficiary(updatedBeneficiary: Beneficiary): void {
    let currentBeneficiaries = this.beneficiariesSubject.value.map(b =>
      b.id === updatedBeneficiary.id ? { ...b, ...updatedBeneficiary } : b
    );
  
    this.beneficiariesSubject.next(currentBeneficiaries);
    this.saveBeneficiaries();
  
    const updated = currentBeneficiaries.find(b => b.id === updatedBeneficiary.id);
    if (updated) {
      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: `Beneficiary ${updated.name} updated successfully`,
      });
    }
  }
}
