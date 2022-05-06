import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import {TableModule} from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    TableComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    TableModule,
    ReactiveFormsModule,
    CardModule
  ],
  exports: [TableComponent, CardComponent]
})
export class SharedModule { }
