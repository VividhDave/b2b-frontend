import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAttributeRoutingModule } from './product-attribute-routing.module';
import { ProductAttributeListComponent } from './product-attribute-list/product-attribute-list.component';
import { ProductAttributeViewComponent } from './product-attribute-view/product-attribute-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductAttributeListComponent,
    ProductAttributeViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProductAttributeRoutingModule
  ]
})
export class ProductAttributeModule { }
