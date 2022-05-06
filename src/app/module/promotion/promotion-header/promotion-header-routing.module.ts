import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionViewComponent } from './promotion-view/promotion-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'promotion-list', pathMatch: 'full' },
  { path: 'promotion-list', component: PromotionListComponent },
  { path: 'promotion-view', component: PromotionViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionHeaderRoutingModule { }
