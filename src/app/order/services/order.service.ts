import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/environment.development';
import { Iorder } from '../models/orderData';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  postInformationDetails(data: any) {
    return this.httpClient.patch(`${environment.baseApi}/user`, data);
  }

  addOrder(data: Iorder) {
    return this.httpClient.post(`${environment.baseApi}/order`, data);
  }
  updatePaymentOrder(data: { id: string; payment: string }) {
    return this.httpClient.patch(`${environment.baseApi}/order/payment`, data);
  }
  //-----------------------------------------------------------------------
  createNeworder(model: any) {
    return this.httpClient.post(`${environment.baseApi}api/v1/orders/`, model);
  }

  getAllOrder() {
    return this.httpClient.get(`${environment.baseApi}api/v1/orders`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'ServerError');
      })
    );
  }

  getOrder(UserId: string) {
    return this.httpClient
      .get(`${environment.baseApi}api/v1/orders/${UserId}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'ServerError');
        })
      );
  }

  deleteCurrentFromOrder(proId) {
    return this.httpClient
      .delete(`${environment.baseApi}api/v1/orders/${proId}/cancel`)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'ServerError');
        })
      );
  }
}
