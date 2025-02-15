import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }

  // Check if the route requires a specific role (Admin only)
  const requiredRole = route.data['role']; // Extract the role requirement from route data
  if (requiredRole && authService.getRole() !== requiredRole) {
    router.navigate(['/']); // Redirect unauthorized users
    return false;
  }

  return true; // Allow access if authenticated and authorized
};
