import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/header/header.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { CartService } from '../../cart/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
product:any;
apiBaseUrl = 'https://localhost:7078';
  cart: any;
constructor( private route: ActivatedRoute,
  private productService:ProductService, private cartService:CartService,private authService:AuthService,private router:Router ){}
  userId: any;
  quantity: number = 1;
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
    })
   this.userId = this.authService.getUserId();
    this.getCart()
  }

  increaseQuantity() {
      this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getCart() {

    this.cartService.getCart(this.userId).subscribe((data) => {
      this.cart = data;
      console.log('cartItem',this.cart);
      
    });
  }
  addToCart(productId:number,quantity:number ) {
    debugger
    this.userId = this.authService.getUserId();
    // Logic to add the product to the cart with the specified quantity
    console.log(`Added ${this.quantity} of ${this.product.name} to the cart.`);
    this.cartService.addToCart(this.userId, productId, quantity).subscribe(()=>{
      this.getCart()
    })
    alert('successfully Added')
  }
}
