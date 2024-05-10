import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private paymentService: PaymentService) { }

  // Dummy payment data
  paymentData = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  // Function to process the payment
  processPayment() {
    // Call the payment service to process the payment
    this.paymentService.processPayment(this.paymentData).subscribe(success => {
      if (success) {
        alert('thanks for your Payment process !');
      } else {
        alert('Payment failed. Please try again.');
      }
    });
  }
}
