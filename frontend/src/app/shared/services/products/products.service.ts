import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiHost } from '../../../../environments/environment';
import { Filter } from '../../models';
// FIXME: transfer product response to frontend models
import { ProductResponse } from '../../../../../../backend/src/modules/product/product.response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private readonly http: HttpClient) { }

  getProducts(skip: number = 0, limit: number = 0): Observable<ProductResponse> {
    const url = this.createBaseUrl(skip, limit);
    return this.http.get<ProductResponse>(url);
  }

  getProductsByFilters(skip: number = 0, limit: number = 0, filter: Filter): Observable<ProductResponse> {
    const url = this.createUrlWithFilter(skip, limit, filter);
    return this.http.get<ProductResponse>(url);
  }

  getProductsForSlider(): Observable<ProductResponse> {
    const url = `${apiHost}/api/products/for-slider`;
    return this.http.get<ProductResponse>(url);
  }

  getProductById(id: string) {
    const url = `${apiHost}/api/products/by-id/${id}`;
    return this.http.get<ProductResponse>(url);
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
