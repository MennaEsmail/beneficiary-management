import { Injectable } from '@angular/core';

export interface User {
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
  private currentUser: User | null = JSON.parse(localStorage.getItem('user') || 'null');

  constructor() {
    this.initializeAdmin(); // Ensure admin exists
  }

  private initializeAdmin() {
    const adminExists = this.users.some(u => u.role === 'admin');
    if (!adminExists) {
      const admin: User = { name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' };
      this.users.push(admin);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  //Register a Beneficiary Only
  register(name: string, email: string, password: string): boolean {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false; 
    }

    const newUser: User = { name, email, password, role: 'beneficiary' };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true; 
  }

  //Login a user
  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  //Logout user
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  //Check if a user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  //Get the role of the current user
  getRole(): 'admin' | 'beneficiary' | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  //Check if the user is an Admin
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  //Check if the user is a Beneficiary
  isBeneficiary(): boolean {
    return this.getRole() === 'beneficiary';
  }
}
