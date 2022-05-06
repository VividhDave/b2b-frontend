import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnOrderRoutingModule } from './return-order-routing.module';
import { ReturnOrderListComponent } from './return-order-list/return-order-list.component';
import { ReturnOrderViewComponent } from './return-order-view/return-order-view.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ReturnOrderListComponent,
    ReturnOrderViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TabsModule,
    ReturnOrderRoutingModule,
    ModalModule.forRoot()
  ]
})
export class ReturnOrderModule { }
