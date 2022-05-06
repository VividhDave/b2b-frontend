import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentHistoryListComponent } from './payment-history-list/payment-history-list.component';
import { PaymentHistoryViewComponent } from './payment-history-view/payment-history-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'payment-list', pathMatch: 'full' },
  { path: 'payment-list', component: PaymentHistoryListComponent },
  { path: 'payment-view', component: PaymentHistoryViewComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentHistoryRoutingModule { }
