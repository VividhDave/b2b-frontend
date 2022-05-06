import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkOrderRoutingModule } from './bulk-order-routing.module';
import { BulkOrderListComponent } from './bulk-order-list/bulk-order-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CouponCreationComponent } from './coupon-creation/coupon-creation.component';


@NgModule({
  declarations: [
    BulkOrderListComponent,
    CouponCreationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TabsModule,
    BulkOrderRoutingModule,
    ModalModule.forRoot()
  ]
})
export class OrderDetailsModule { }
