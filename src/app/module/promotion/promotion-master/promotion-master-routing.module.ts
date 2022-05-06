import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PromotionCreationComponent} from './promotion-creation/promotion-creation.component';
import {PromotionViewComponent} from './promotion-view/promotion-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'promotion-creation', pathMatch: 'full' },
  { path: 'promotion-creation', component: PromotionCreationComponent },
  { path: 'promotion-view', component: PromotionViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionMasterRoutingModule { }
