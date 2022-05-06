import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChilledCategoryRoutingModule } from './chilled-category-routing.module';
import { ChilledCategoryListComponent } from './chilled-category-list/chilled-category-list.component';
import { ChilledCategoryViewComponent } from './chilled-category-view/chilled-category-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChilledCategoryListComponent,
    ChilledCategoryViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ChilledCategoryRoutingModule
  ]
})
export class ChilledCategoryModule { }
