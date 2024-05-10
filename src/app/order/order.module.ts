import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './components/payment/payment.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentComponent, OrdersComponent],
  imports: [CommonModule, FormsModule],
  exports: [PaymentComponent, OrdersComponent],
})
export class OrderModule {}
