import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Beneficiary Management System';
  sidebarVisible = false;
  menuItems: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateMenuItems();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  getRole(): 'admin' | 'beneficiary' | null {
    return this.authService.getRole();
  }

  updateMenuItems() {
    const role = this.authService.getRole(); // 'admin' | 'beneficiary' | null
  
    this.menuItems = [
      {
        label: 'Beneficiaries',
        icon: 'pi pi-users',
        routerLink: '/beneficiaries',
      },
      ...(role === 'admin' ? [ 
        {
          label: 'Add Beneficiary',
          icon: 'pi pi-plus',
          routerLink: '/add-beneficiary',
        },
        {
          label: 'Approve Beneficiaries',
          icon: 'pi pi-check',
          routerLink: '/approve-beneficiaries',
        },
      ] : []),
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
          { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
          { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
        ],
      },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.sidebarVisible = false;
    this.updateMenuItems();
  }
}
