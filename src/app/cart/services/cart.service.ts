import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private Url = environment.baseApi;
  constructor(private http: HttpClient) {}
  createNewCart(model: any) {
    return this.http.post(`${this.Url}api/v1/cart/add`, model);
  }
  getCart() {
    return this.http
      .get(`${this.Url}api/v1/cart/${sessionStorage.getItem('userEmail')}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'ServerError');
        })
      );
  }

  delItemFromCart(proId) {
    return this.http.delete(`${this.Url}api/v1/cart/del/${proId}`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'ServerError');
      })
    );
  }

  deleteAllFromCart() {
    return this.http.delete(`${this.Url}api/v1/cart/clear`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'ServerError');
      })
    );
  }
  addOneItem(data: any) {
    let myData = {
      proId: data.proId,
      proName: data.proName,
      proDescription: data.proDescription,
      proCategory: data.proCategory,
      proPrice: data.proPrice,
      proImg: data.proImg,
      quantity: (parseInt(data.quantity) + 1).toString(),
      userEmail: sessionStorage.getItem('userEmail'),
    };
    console.log(myData);
    return this.http.put(`${this.Url}api/v1/cart/upd/${data.proId}`, myData);
  }
  minusOneItem(data: any) {
    let myData = {
      proId: data.proId,
      proName: data.proName,
      proDescription: data.proDescription,
      proCategory: data.proCategory,
      proPrice: data.proPrice,
      proImg: data.proImg,
      quantity: (parseInt(data.quantity) - 1).toString(),
      userEmail: sessionStorage.getItem('userEmail'),
    };
    console.log(myData);
    return this.http.put(`${this.Url}api/v1/cart/upd/${data.proId}`, myData);
  }

  addCartToIrder(data: any) {
    let myData = {
      proId: data.proId,
      proName: data.proName,
      proDescription: data.proDescription,
      proCategory: data.proCategory,
      proPrice: data.proPrice,
      proImg: data.proImg,
      quantity: data.quantity.toString(),
      userEmail: data.userEmail,
      orderStatus: false,
    };
    console.log(myData);
    return this.http.post(`${this.Url}api/v1/orders/add`, myData);
  }
}
