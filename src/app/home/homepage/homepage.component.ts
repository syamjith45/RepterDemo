import { Component } from '@angular/core';

import { HeaderComponent } from '../../core/header/header.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { CarouselComponent } from '../../core/carousel/carousel.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CarouselComponent,ProductCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
