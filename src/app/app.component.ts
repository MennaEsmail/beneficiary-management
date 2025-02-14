import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'beneficiary-management';
  sidebarVisible = true; // sidebar is open by default

  menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/',
    },
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
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      items: [
        { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
        { label: 'Logout', icon: 'pi pi-sign-out', routerLink: '/logout' },
      ],
    },
  ];
}
