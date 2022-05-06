import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'promo',
    loadChildren: () => import('./promotion-header/promotion-header.module').then(m => m.PromotionHeaderModule)
  },
  {
    path: 'promo-type',
    loadChildren: () => import('./promotion-type/promotion-type.module').then(m => m.PromotionTypeModule)
  },
  {
    path: 'promotion-master',
    loadChildren: () => import('./promotion-master/promotion-master.module').then(m => m.PromotionMasterModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
