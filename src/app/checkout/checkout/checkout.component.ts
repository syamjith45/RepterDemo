import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { PaymentService } from '../payment.service';
import { CartdataService } from '../../shared/cartdata.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartItems: any;
  totalAmount: number = 0; // Set default value to 0 to prevent undefined issues
  isShippingDetailsSaved = false;
  shippingDetails: any = {}; // Object for storing shipping details
  userId: any;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private paymentService: PaymentService,
    private cartTotal: CartdataService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
    this.loadCartItems();
  }

  // Load cart items from cart service or state
  loadCartItems() {
    this.cartService.getCart(this.userId).subscribe((data) => {
      this.cartItems = data;
      console.log('CartItems:', this.cartItems);

      // Calculate total amount only after cart items are loaded
      if (this.cartItems && this.cartItems.cartItems && this.cartItems.cartItems.length > 0) {
        this.totalSumCal();
      } else {
        this.totalAmount = 0; // Set totalAmount to 0 if cartItems is empty
      }
    });
  }

  // Calculate the total amount
  totalSumCal() {
    if (this.cartItems && this.cartItems.cartItems) {
      this.totalAmount = this.cartItems.cartItems.reduce((sum: number, item: any) => {
        return sum + item.product.price * item.quantity;
      }, 0);
      console.log('totalAmount:', this.totalAmount);
    } else {
      this.totalAmount = 0; // Default to 0 if cart or cartItems is undefined
    }
  }

  saveShippingDetails() {
    if (this.shippingDetails) {
      console.log('Shipping Details Saved:', this.shippingDetails);
      this.isShippingDetailsSaved = true;
    } else {
      console.log('Form is not initialized properly.');
    }
  }

  proceedToPay() {
    if (this.isShippingDetailsSaved) {
      this.paymentService.createOrder(this.totalAmount).subscribe(
        (response) => {
          const options = {
            key: response.key, // Razorpay key
            amount: response.amount, // Amount is in paise
            currency: response.currency,
            name: 'Repter Innovations',
            description: 'Purchase Description',
            order_id: response.orderId, // Order ID from backend
            handler: (res: any) => {
              console.log('Payment successful:', res);
            },
            prefill: {
              name: this.shippingDetails.fullName,
              email: 'customer@example.com',
              contact: this.shippingDetails.phoneNumber
            },
            theme: {
              color: '#F37254'
            }
          };
          const rzp = new Razorpay(options);
          rzp.open();
        },
        (error) => {
          console.error('Error creating order:', error);
        }
      );
    } else {
      console.log('Shipping details are not saved yet.');
    }
  }
}
