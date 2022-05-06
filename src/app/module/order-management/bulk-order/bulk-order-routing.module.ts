import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkOrderListComponent } from './bulk-order-list/bulk-order-list.component';
import { CouponCreationComponent } from './coupon-creation/coupon-creation.component';

const routes: Routes = [
  { path: '', redirectTo: 'bulk-order-list', pathMatch: 'full' },
  { path: 'bulk-order-list', component: BulkOrderListComponent },
  { path: 'coupon-creation', component: CouponCreationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkOrderRoutingModule { }
