import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from './product.service'

@Component({
  selector: 'app-service',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  products: Product[];
  constructor(private ProductService: ProductService) {
    this.products = [];
  }

  ngOnInit() {
    this.showConfig()
  }

  showConfig() {
    this.ProductService.getConfig()
      .subscribe((data: Product[]) => {
        for (const product of data) {
          this.products.push({
            id: product['id'],
            name: product['name'],
            description: product['description'],
            category: product['category'],
            brand: product['brand'],
            price: product['price'],
            sizes: product['sizes'],
            colors: product['colors'],
            images: product['images'],
          });
        }
      }
    );
  }

}
