import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';


// Beneficiary Components
import { ListComponent } from './beneficiaries/list/list.component';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent,ListComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    TableModule,
    RatingModule,
    RouterModule.forRoot([]), 
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
