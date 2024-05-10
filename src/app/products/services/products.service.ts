import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private Url = environment.baseApi;
  constructor(private http: HttpClient) {}
  getAllProductServices() {
    return this.http.get(`${this.Url}api/v1/product`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'ServerError');
      })
    );
  }
  getAllProCategory() {
    return this.http.get(`${this.Url}api/v1/category`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'ServerError');
      })
    );
  }

  getProductsByCategory(key) {
    return this.http.get(`${this.Url}api/v1/product/cate/${key}`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'ServerError');
      })
    );
  }

  addProducToCart(data: any) {
    let myData = {
      proId: data.item._id,
      proName: data.item.proName,
      proDescription: data.item.proDescription,
      proCategory: data.item.proCategory,
      proPrice: data.item.proPrice,
      proImg: data.item.proImg,
      quantity: data.quantity.toString(),
      userEmail: 'mustafa.abdo4941@gmail.com',
    };
    console.log(myData);
    return this.http.post(`${this.Url}api/v1/cart/add`, myData);
  }
  getProductsDetails(key) {
    return this.http.get(`${this.Url}api/v1/product/${key}`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'ServerError');
      })
    );
  }
}
