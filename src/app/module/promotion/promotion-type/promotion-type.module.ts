import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionTypeRoutingModule } from './promotion-type-routing.module';
import { PromotionTypeListComponent } from './promotion-type-list/promotion-type-list.component';
import { PromotionTypeViewComponent } from './promotion-type-view/promotion-type-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PromotionTypeListComponent,
    PromotionTypeViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PromotionTypeRoutingModule
  ]
})
export class PromotionTypeModule { }
