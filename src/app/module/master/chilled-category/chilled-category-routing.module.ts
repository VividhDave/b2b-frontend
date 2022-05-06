import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChilledCategoryListComponent } from './chilled-category-list/chilled-category-list.component';
import { ChilledCategoryViewComponent } from './chilled-category-view/chilled-category-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'chilled-category-list', pathMatch: 'full' },
  { path: 'chilled-category-list', component: ChilledCategoryListComponent },
  { path: 'chilled-category-view', component: ChilledCategoryViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChilledCategoryRoutingModule { }
