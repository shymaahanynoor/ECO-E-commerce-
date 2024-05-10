import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IOrder } from './models/IOrder';
import { environment } from '../../enviroments/environment.development';
import { OrderStatus } from './models/order-status.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}
  private url=environment.baseApi+"api/v1/admin/orders"
  getOrders(): Observable<IOrder[]> {
    return this.http.get<any[]>(this.url).pipe(
      map((orders: any[]) => {
        return orders.map(order => ({
          _id:order._id,
          userEmail: order.userEmail,
          date: new Date(order.createdAt),
          totalPrice: order.proPrice,
          productTitle: order.proName,
          state: order.orderStatus
        }));
      })
    );
  }
  updateOrderState(orderId: string, newState: OrderStatus): Observable<{ message: string, order: IOrder }> {
    const url = `${this.url}/updateStatus/${orderId}`;
    const body = { state: newState };
    return this.http.put<{ message: string, order: any }>(url, body).pipe(
      map(({ message, order }) => {
        // Transform the order object from backend model to frontend model
        const transformedOrder: IOrder = {
          _id:order._id,
          userEmail: order.userEmail,
          date: order.createdAt,
          totalPrice: order.totalPrice,
          productTitle: order.proName,
          state: order.orderStatus
        };
        return { message, order: transformedOrder };
      }),catchError((err)=>{
        console.error('Error updating order state:', err);
        return throwError('Failed to update order state. Please try again later.');
      })
    );
  }
}
