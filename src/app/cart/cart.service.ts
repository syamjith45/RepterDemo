import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient ) { }

  private apiUrl = 'https://localhost:7078/api/Cart';

  getCart(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  addToCart(userId:number,productId:number,quantity:number):Observable<any>{
    return this.http.post(`${this.apiUrl}/${userId}`,{productId,quantity});
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartItemId}`);
  }

  updateCart(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cartItemId}`, { quantity });
  }
}
