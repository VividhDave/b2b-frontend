import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnOrderListComponent } from './return-order-list/return-order-list.component';
import { ReturnOrderViewComponent } from './return-order-view/return-order-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'return-order-list', pathMatch: 'full' },
  { path: 'return-order-list', component: ReturnOrderListComponent },
  { path: 'return-order-view', component: ReturnOrderViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnOrderRoutingModule { }
