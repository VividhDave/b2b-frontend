import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandViewComponent } from './brand-view/brand-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'brand-list', pathMatch: 'full' },
  { path: 'brand-list', component: BrandListComponent },
  { path: 'brand-view', component: BrandViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
