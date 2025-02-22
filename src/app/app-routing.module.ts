import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { ListComponent } from './beneficiaries/list/list.component';
import { AddComponent } from './beneficiaries/add/add.component';
import {LoginComponent} from './authentication/login/login.component';
import {ApproveBeneficiariesComponent} from './beneficiaries/approve-beneficiaries/approve-beneficiaries.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: 'beneficiaries', component: ListComponent, canActivate: [authGuard] }, 
  { path: 'add-beneficiary', component: AddComponent, canActivate: [authGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'edit-beneficiary/:id', component: AddComponent, canActivate: [authGuard], data: { role: 'admin' } },
  { path: 'approve-beneficiaries', component: ApproveBeneficiariesComponent, canActivate: [authGuard],data: { role: 'admin' } },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
