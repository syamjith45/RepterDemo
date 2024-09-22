import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartdataService {

  constructor() { }
  private totalAmountSource = new BehaviorSubject<any>(0);
  totalAmount$ = this.totalAmountSource.asObservable();


  setTotalAmount(amount: any) {
    this.totalAmountSource.next(amount);
  }
}
