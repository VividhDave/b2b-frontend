import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTING } from '../../constant/auth-route/auth-routing.constant';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: AUTH_ROUTING.LOGIN, pathMatch: 'full' },
  { path: AUTH_ROUTING.LOGIN, component: LoginComponent },
  { path: AUTH_ROUTING.REGISTRATION, component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
