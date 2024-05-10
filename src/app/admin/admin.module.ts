import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products/products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductFormComponent } from './products/product-form/product-form.component';



@NgModule({
  declarations: [OrdersComponent,ProductsComponent,ProductDetailsComponent,ProductFormComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
