import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategory() {
    return this.http.get(`http://localhost:3000/api/v1/category`).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'ServerError');
      })
    );
  }

}


