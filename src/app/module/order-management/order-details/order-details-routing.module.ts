import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsListComponent } from './order-details-list/order-details-list.component';
import { OrderDetailsViewComponent } from './order-details-view/order-details-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'order-details-list', pathMatch: 'full' },
  { path: 'order-details-list', component: OrderDetailsListComponent },
  { path: 'order-details-view', component: OrderDetailsViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailsRoutingModule { }
