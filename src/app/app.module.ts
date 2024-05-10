import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { FooterModule } from './footer/footer.module';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS,  HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PaymentComponent } from './payment/components/payment/payment.component';

@NgModule({
  declarations: [AppComponent, UnauthorizedComponent, PaymentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    CommonModule,
    ProductsModule,
    CartModule,
    CategoryModule,
    UserModule,
    OrderModule,
    FooterModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
