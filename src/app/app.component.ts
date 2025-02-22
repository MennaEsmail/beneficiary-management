import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Beneficiary Management System';
  sidebarVisible = false;
  menuItems: any[] = [];
  currentUser$: Observable<any>;

  constructor(private authService: AuthService, private router: Router, private cdRef: ChangeDetectorRef) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    // Ensure menu updates when user logs in or logs out
    this.currentUser$.subscribe(() => { 
      this.updateMenuItems(); 
      this.cdRef.detectChanges(); // Force UI update
    });

    this.updateMenuItems();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  updateMenuItems() {
    const role = this.authService.getRole();
    console.log('Role Updated:', role); // Debugging

    this.menuItems = [
      {
        label: 'Beneficiaries',
        icon: 'pi pi-users',
        routerLink: '/beneficiaries',
      },
      {
        label: 'Add Beneficiary',
        icon: 'pi pi-plus',
        routerLink: '/add-beneficiary',
      },
      ...(role === 'admin' ? [ 
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
          ...(role !== 'admin' ? [ 
            { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
          ] : []),
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
    this.cdRef.detectChanges(); //Ensure UI updates instantly
  }
}
