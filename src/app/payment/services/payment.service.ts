import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }
  processPayment(paymentData: any): Observable<boolean> {
    // Here you can simulate any payment logic you need
    // For simplicity, let's just return true for successful payment
    return of(true);
  }
}
