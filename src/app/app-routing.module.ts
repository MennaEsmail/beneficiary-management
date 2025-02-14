import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './beneficiaries/list/list.component';
import { AddComponent } from './beneficiaries/add/add.component';
const routes: Routes = [
  { path: '', redirectTo: '/beneficiaries', pathMatch: 'full' }, // ✅ Default route
  { path: 'beneficiaries', component: ListComponent }, 
  { path: 'add-beneficiary', component: AddComponent },
  { path: 'edit-beneficiary/:id', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
