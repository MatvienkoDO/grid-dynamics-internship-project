import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiHost } from '../../../../environments/environment';
import { Product, Filter } from '../../models'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private readonly http: HttpClient) { }

  getProducts(skip: number = 0, limit: number = 0): Observable<Product[]> {
    const url = this.createBaseUrl(skip, limit);
    return this.http.get<Product[]>(url);
  }

  getProductsByFilters(skip: number = 0, limit: number = 0, filter: Filter): Observable<Product[]> {
    const url = this.createUrlWithFilter(skip, limit, filter);
    return this.http.get<Product[]>(url);
  }

  private createBaseUrl(skip: number = 0, limit: number = 0) {
    return `${apiHost}/api/products?skip=${skip}&limit=${limit}`;
  }

  // TODO: create tests for it
  private createUrlWithFilter(skip: number = 0, limit: number = 0, filter: Filter) {
    let url = this.createBaseUrl(skip, limit);
    
    for(const filterName in filter) {
      const value = filter[filterName];
      const values = Array.isArray(value) ? value : [value];
      
      for (const value of values) {
        url += `&${filterName}=${value}`;
      }
    }

    return url;
  }
}
