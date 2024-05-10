import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

const routes:Routes=[
      {path:'',component:AdminDashboardComponent,},
      {path:'products',component:ProductsComponent,},
      {path:'products/add',component:ProductFormComponent},
      {path:'products/:id',component:ProductDetailsComponent},
      {path:'orders',component:OrdersComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
