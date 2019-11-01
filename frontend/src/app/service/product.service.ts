import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiHost } from '../../environments/environment';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly http: HttpClient) { }

  getConfig() {
    return this.http.get(`${apiHost}/api/products`);
  }
}
