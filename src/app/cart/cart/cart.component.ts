import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { CartdataService } from '../../shared/cartdata.service';
import { HeaderComponent } from '../../core/header/header.component';
import { FooterComponent } from '../../core/footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  TotalAmount:any
  cart:any
  userId:any
  constructor(private auth:AuthService,private cartService:CartService,private router:Router,private cartTotal:CartdataService){
  }
  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.getCart();
    
  }

  getCart() {
    this.cartService.getCart(this.userId).subscribe((data) => {
      this.cart = data;
      this.totalSumCal()
    });
    
  }

  removeFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId).subscribe(() => {
      this.getCart();
    });
  }

  updateCart(cartItemId: number, quantity: number) {
    this.cartService.updateCart(cartItemId, quantity).subscribe(() => {
      this.getCart();
    });
  }

  proceedToCheckout(){
    this.router.navigate(['/checkout']);
  }

  totalSumCal() {
  
    if (this.cart && this.cart.cartItems) {  // Check if cart and cartItems exist
      this.TotalAmount = this.cart.cartItems.reduce((sum: number, item: any) => {
        return sum + (item.product.price * item.quantity);
      
      }, 0);
      this.cartTotal.setTotalAmount(this.TotalAmount)
    } else {
      this.TotalAmount = 0; // Default to 0 if cart or cartItems is undefined
    }
  }
  
  
}
