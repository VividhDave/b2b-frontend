import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserViewComponent } from './user-view/user-view.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAddressComponent } from './add-address/add-address.component';
import { UserListMobileComponent } from './user-list-mobile/user-list-mobile.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserViewComponent,
    UserListMobileComponent,
    AddAddressComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
