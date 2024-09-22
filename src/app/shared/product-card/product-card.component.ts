import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  products:any=[];
  apiBaseUrl = 'https://localhost:7078';
  constructor(private product:ProductService){

   
  }
  ngOnInit(): void {
    this.product.getProducts().subscribe((data)=>{
      this.products=data;
      console.log(this.products);
      
    })
  }



}
