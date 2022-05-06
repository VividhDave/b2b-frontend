import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionTypeListComponent } from './promotion-type-list/promotion-type-list.component';
import { PromotionTypeViewComponent } from './promotion-type-view/promotion-type-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'promotion-type-list', pathMatch: 'full' },
  { path: 'promotion-type-list', component: PromotionTypeListComponent },
  { path: 'promotion-type-view', component: PromotionTypeViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionTypeRoutingModule { }
