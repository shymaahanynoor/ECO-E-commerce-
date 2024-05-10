import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { OrderService } from '../../services/order.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { CartComponent } from '../../../cart/components/cart/cart.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  private routeSub: Subscription;
  id: string;
  constructor(
    private cartComp: CartComponent,
    private cartService: CartService,
    private orderServices: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    setTimeout(() => {
      render({
        id: '#paypal-button',
        currency: 'USD',
        value: `${this.cartComp.getTotal()}`,
        onApprove: () => {
          alert('The transaction successful');
          this.orderServices
            .updatePaymentOrder({ id: this.id, payment: 'true' })
            .subscribe((res) => {
              if (!res) {
                alert('someting go wrongt');
              } else {
                this.cartService.deleteAllFromCart();
                this.router.navigate(['']);
              }
            });
        },
      });
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  payCash() {
    this.orderServices
      .updatePaymentOrder({ id: this.id, payment: 'cash' })
      .subscribe((res) => {
        if (!res) {
          alert('someting go wrongt');
        } else {
          this.cartService.deleteAllFromCart();
          this.router.navigate(['']);
        }
      });
  }
}
