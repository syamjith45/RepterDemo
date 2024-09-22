import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

   
   }

   private apiUrl = 'https://localhost:7078/api/Products';

   getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProductById(id:any) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
}
