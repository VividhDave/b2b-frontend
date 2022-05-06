import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'brand',
    loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'sub-category',
    loadChildren: () => import('./sub-category/sub-category.module').then(m => m.SubCategoryModule)
  },
  {
    path: 'chilled-category',
    loadChildren: () => import('./chilled-category/chilled-category.module').then(m => m.ChilledCategoryModule)
  },
  {
    path: 'product-attribute',
    loadChildren: () => import('./product-attribute/product-attribute.module').then(m => m.ProductAttributeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
