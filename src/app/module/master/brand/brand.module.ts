import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandViewComponent } from './brand-view/brand-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BrandListComponent,
    BrandViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BrandRoutingModule
  ]
})
export class BrandModule { }
