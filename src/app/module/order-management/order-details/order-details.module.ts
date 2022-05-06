import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsListComponent } from './order-details-list/order-details-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { OrderDetailsViewComponent } from './order-details-view/order-details-view.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    OrderDetailsListComponent,
    OrderDetailsViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TabsModule,
    OrderDetailsRoutingModule,
    ModalModule.forRoot()
  ]
})
export class OrderDetailsModule { }
