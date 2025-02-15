import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//pips
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChipsModule } from 'primeng/chips';
// Beneficiary Components
import { ListComponent } from './beneficiaries/list/list.component';
import { AddComponent } from './beneficiaries/add/add.component';
import { ProfileComponent } from './profile/profile.component';
// Routing Module
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [AppComponent,ListComponent,AddComponent,ProfileComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    TableModule,
    RatingModule,
    PanelMenuModule,
    SidebarModule,
    ButtonModule,
    ConfirmDialogModule,
    MessageModule,
    ToastModule,
    ChipsModule,
    RouterModule.forRoot([]), 
    AppRoutingModule,
    FilterPipe,
    SortPipe,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
