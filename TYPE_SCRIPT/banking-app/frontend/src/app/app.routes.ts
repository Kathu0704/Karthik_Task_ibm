import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { DashboardComponent } from './dashboard/dashboard';
import { TransactionDetailsComponent } from './transaction-details/transaction-details';

export const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'transactions', component: TransactionDetailsComponent }
];