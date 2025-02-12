import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './beneficiaries/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/beneficiaries', pathMatch: 'full' }, // ✅ Default route
  { path: 'beneficiaries', component: ListComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
