import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryViewComponent } from './sub-category-view/sub-category-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'sub-category-list', pathMatch: 'full' },
  { path: 'sub-category-list', component: SubCategoryListComponent },
  { path: 'sub-category-view', component: SubCategoryViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
