import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    ProductItemComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CheckoutComponent,
    ProductDetailsComponent,
    OrderCompletedComponent,
    UserOrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule
  
  ],
  providers: [ {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi   : true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
