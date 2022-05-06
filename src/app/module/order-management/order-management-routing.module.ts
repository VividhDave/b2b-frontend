import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'order-detail',
    loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule)
  },
  {
    path: 'return-order',
    loadChildren: () => import('./return-order/return-order.module').then(m => m.ReturnOrderModule)
  },
  {
    path: 'bulk-order',
    loadChildren: () => import('./bulk-order/bulk-order.module').then(m => m.OrderDetailsModule)
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
