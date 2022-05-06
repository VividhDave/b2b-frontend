import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryViewComponent } from './category-view/category-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'category-list', pathMatch: 'full' },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'category-view', component: CategoryViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
