import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'https://localhost:7078/api/Razorpay';


  createOrder(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-order`, { amount });
  }

  verifyPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-payment`, data);
  }
}
