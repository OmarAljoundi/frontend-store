import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'signup' , component:RegisterComponent},
  { path: 'signin' , component:LoginComponent},
  { path: 'checkout/success' , component:OrderCompletedComponent},
  { path: 'orders_completed' , component:UserOrdersComponent},
  { path:'orders_completed/:id', component:OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
