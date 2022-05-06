import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddImagesComponent } from './add-images/add-images.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import {RequestForQuotationComponent} from './request-for-quotation/request-for-quotation.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-view', component: ProductViewComponent },
  { path: 'add-image', component: AddImagesComponent },
  { path: 'request-for-quotation', component: RequestForQuotationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
