import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryViewComponent } from './sub-category-view/sub-category-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SubCategoryListComponent,
    SubCategoryViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SubCategoryRoutingModule
  ]
})
export class SubCategoryModule { }
