import { Routes } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [


    { path: '', component:HomepageComponent, pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
    { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
    { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
    { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    { path: '**', redirectTo: '/products' }
];
