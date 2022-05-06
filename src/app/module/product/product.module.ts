import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddImagesComponent } from './add-images/add-images.component';
import { RequestForQuotationComponent } from './request-for-quotation/request-for-quotation.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductViewComponent,
    AddImagesComponent,
    RequestForQuotationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
