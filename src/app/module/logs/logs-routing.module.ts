import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsListComponent } from './logs-list/logs-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'logs-list', pathMatch: 'full' },
  { path: 'logs-list', component: LogsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
