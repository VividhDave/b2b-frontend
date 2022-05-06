import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionMasterRoutingModule } from './promotion-master-routing.module';
import { PromotionCreationComponent } from './promotion-creation/promotion-creation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { PromotionViewComponent } from './promotion-view/promotion-view.component';


@NgModule({
  declarations: [
    PromotionCreationComponent,
    PromotionViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PromotionMasterRoutingModule,
    TabsModule
  ]
})
export class PromotionMasterModule { }
