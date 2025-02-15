import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule, 
    ButtonModule, 
    InputTextModule, 
    DropdownModule
  ]
})
export class LoginComponent {
  isRegisterMode = false; // Toggle between Login & Register
  authForm: FormGroup;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = ''; // Clear any previous errors
  }

  submitForm() {
    if (this.authForm.invalid) return;

    const { name, email, password } = this.authForm.value;

    if (this.isRegisterMode) {
      const success = this.authService.register(name, email, password);
      if (success) {
        this.toggleMode(); // Switch to login after successful registration
      } else {
        this.errorMessage = 'User already exists!';
      }
    } else {
      const success = this.authService.login(email, password);
      if (success) {
        this.router.navigate(['/beneficiaries']);
      } else {
        this.errorMessage = 'Invalid email or password!';
      }
    }
  }
}
