import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { IProduct } from './models/IProduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.baseApi+'api/v1/product';
  private productsSubject = new BehaviorSubject<IProduct[]>([]);
  products$: Observable<IProduct[]> = this.productsSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAllProductsService() {
    return this.httpClient.get<IProduct[]>(this.url).pipe(
      tap(products=>console.log("fetched products",products)),
      tap(products => this.productsSubject.next(products)), // Update BehaviorSubject with fetched data
      catchError(err => {
        return throwError(() => `Error in admin\\products : ${err.message}`);
      })
    );
  }

  addProductService(data: IProduct) {
    return this.httpClient.post<IProduct>(this.url, data).pipe(
      tap(newProduct => {
        const updatedProducts = [...this.productsSubject.value, newProduct];
        this.productsSubject.next(updatedProducts); // Update BehaviorSubject with added product
      }),
      catchError(err => {
        return throwError(() => `Error in admin\\products : ${err.message}`);
      })
    );
  }

  getProductById(productId: string): Observable<IProduct> {
    return this.productsSubject.pipe(
      // Find the product with the specified ID
      map(products => products.find((product: IProduct) => product._id === productId))
    );
  }
  editProductService(id: string, data: IProduct) {
    const editUrl = `${this.url}/${id}`;
    return this.httpClient.patch<IProduct>(editUrl, data).pipe(
      tap(updatedProduct => {
        const updatedProducts = this.productsSubject.value.map(product =>
          product._id === id ? updatedProduct : product
        );
        this.productsSubject.next(updatedProducts); // Update BehaviorSubject with edited product
      }),
      catchError(err => {
        return throwError(() => `Error in admin\\products : ${err.message}`);
      })
    );
  }

  deleteProductService(id: string) {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete<void>(deleteUrl).pipe(
      tap(() => {
        const updatedProducts = this.productsSubject.value.filter(product => product._id !== id);
        this.productsSubject.next(updatedProducts); // Update BehaviorSubject by removing deleted product
      }),
      catchError(err => {
        return throwError(() => `Error in admin\\products : ${err.message}`);
      })
    );
  }

//todo:enhancing these by using rxjs and observables instead
//   getAllProductsService(){
//     return this.httpClient.get(`${this.Url}api/v1/product`).pipe(
//       catchError((err)=>{
//         return throwError(()=>`Error in admin\\products : ${err.message}`);
//       })
//     )
//   }
// addProductService(data:Iproduct){
//   return this.httpClient.post(`${this.Url}api/v1/`,data)
//    .pipe(catchError(err =>{
//     return throwError(()=>`Error in admin\\products : ${err.message}`);
//    }))
// }
// editProductService(id:string , data: Iproduct ){
//   return this.httpClient.patch(`${this.Url}api/v1/${id}`,data).pipe(catchError(err =>{
//     return throwError(()=>`Error in admin\\products : ${err.message}`);
//    }))
// }
// deleteProductService(id: string){
//   return this.httpClient.delete(`${this.Url}api/v/${id}`).pipe(catchError(err =>{
//     return throwError(()=>`Error in admin\\products : ${err.message}`);
//    }))
// }
}
