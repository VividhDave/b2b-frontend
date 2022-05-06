import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAttributeListComponent } from './product-attribute-list/product-attribute-list.component';
import { ProductAttributeViewComponent } from './product-attribute-view/product-attribute-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'product-attribute-list', pathMatch: 'full' },
  { path: 'product-attribute-list', component: ProductAttributeListComponent },
  { path: 'product-attribute-view', component: ProductAttributeViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAttributeRoutingModule { }
