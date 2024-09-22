import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products:any=[]
  constructor(private ProductService:ProductService){

  }
  ngOnInit(): void {
    this.ProductService.getProducts().subscribe((data)=>{
      this.products=data;

      console.log(this.products);
      
    })
  }

  
}
