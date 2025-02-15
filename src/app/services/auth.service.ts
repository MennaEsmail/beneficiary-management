import { Injectable } from '@angular/core';
import { BeneficiaryService, Beneficiary } from './beneficiary.service';
import { BehaviorSubject } from 'rxjs';
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'beneficiary';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  currentUser$ = this.currentUserSubject.asObservable();
  currentUser: User | null = this.getCurrentUser();
  constructor(  private beneficiaryService: BeneficiaryService) {
    this.initializeAdmin(); // Ensure admin user exists
  }


  private initializeAdmin() {
    const adminExists = this.users.some(u => u.role === 'admin');
    if (!adminExists) {
      const admin: User = { id: 1, name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' };
      this.users.push(admin);
      this.saveUsers();
    }
  }


  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }


  register(name: string, email: string, password: string): boolean {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false; 
    }

    // Generate a unique ID
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 2;

    const newUser: User = { id: newId, name, email, password, role: 'beneficiary' };
    this.users.push(newUser);
    this.saveUsers();
    this.addUserAsBeneficiary(newUser);

    //Refresh UI instantly after registration
    this.refreshUI();
    
    return true;
}


  private addUserAsBeneficiary(user: User): void {
    let beneficiaries: Beneficiary[] = JSON.parse(localStorage.getItem('beneficiaries') || '[]');
  
    // Check if they are already a beneficiary
    if (!beneficiaries.some(b => b.id === user.id)) {
      const newBeneficiary: Beneficiary = {
        id: user.id,
        name: user.name,
        technologies: [], 
        rating: 3, 
        status: 'pending', // New users require admin approval
        budget: 0, 
        age: 0 
      };
  
      beneficiaries.push(newBeneficiary);
      localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries));
    }
  }
 
  login(email: string, password: string): boolean {
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        this.getRole();
        // Refresh UI instantly after login
        this.refreshUI();
        
        return true;
    }
    return false;
}
private refreshUI() {
  this.beneficiaryService.loadBeneficiaries();
  window.dispatchEvent(new Event('storage')); // Forces Angular to update UI
}



  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

 
  getRole(): 'admin' | 'beneficiary' | null {
    return this.getCurrentUser()?.role || null;
  }


  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

 
  isBeneficiary(): boolean {
    return this.getRole() === 'beneficiary';
  }

 
  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

}
