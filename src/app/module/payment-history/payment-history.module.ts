import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
import { PaymentHistoryListComponent } from './payment-history-list/payment-history-list.component';
import { PaymentHistoryViewComponent } from './payment-history-view/payment-history-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PaymentHistoryListComponent,
    PaymentHistoryViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PaymentHistoryRoutingModule
  ]
})
export class PaymentHistoryModule { }
