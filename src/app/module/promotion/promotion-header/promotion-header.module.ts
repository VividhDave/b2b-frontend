import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionHeaderRoutingModule } from './promotion-header-routing.module';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PromotionViewComponent } from './promotion-view/promotion-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PromotionListComponent,
    PromotionViewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PromotionHeaderRoutingModule
  ]
})
export class PromotionHeaderModule { }
