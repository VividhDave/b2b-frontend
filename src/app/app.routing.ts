import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth-guard/auth-guard.guard';
import { AUTH_ROUTING } from './constant/auth-route/auth-routing.constant';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { PolicyComponent } from './policy/policy.component';
import { TermsComponent } from './terms/terms.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';

export const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'home/terms', 
    component: TermsComponent,
  },

  {
    path: 'home/policy', 
    component: PolicyComponent,
  },

    {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: AUTH_ROUTING.AUTH,
    children: [
      {
        path: '',
        loadChildren: (): Promise<unknown> => import('./module/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'sign-in',
        loadChildren: (): Promise<unknown> => import('./module/auth/auth.module').then(module => module.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      // title: 'Home'
    },
    canActivate:[AuthGuardGuard],
    children: [
      {
        path: 'master',
        loadChildren: () => import('./module/master/master.module').then(m => m.MasterModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./module/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'promotion',
        loadChildren: () => import('./module/promotion/promotion.module').then(m => m.PromotionModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./module/order-management/order-management.module').then(m => m.OrderManagementModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./module/payment-history/payment-history.module').then(m => m.PaymentHistoryModule)
      },
      {
        path: 'log',
        loadChildren: () => import('./module/logs/logs.module').then(m => m.LogsModule)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
