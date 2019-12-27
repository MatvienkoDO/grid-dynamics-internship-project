import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { tap, debounceTime, switchMap, share, map } from 'rxjs/operators';

import { Product, Paging, Filter } from '../../models';
import { ProductsService } from '../products/products.service';

export interface Query {
  filter: Filter;
  paging: Paging;
}

export interface UrlQuery {
  skip?: string;
  limit?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sizes?: string | string[];
  brands?: string | string[];
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  private products = new BehaviorSubject<Product[]>([]);
  private productsQuantity = new BehaviorSubject<number>(0);
  private readonly loading = new BehaviorSubject<boolean>(true);
  private readonly query = new BehaviorSubject<Query>({
    filter: {},
    paging: {
      limit: 9
    }
  });
  public products$: Observable<Product[]>;
  public productsQuantity$: Observable<number>;
  public loading$: Observable<boolean>;
  public query$: Observable<Query>;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly router: Router,
  ) {
    this.products$ = this.products.asObservable();
    this.productsQuantity$ = this.productsQuantity.asObservable();
    this.query$ = this.query.asObservable();
    this.loading$ = this.loading.asObservable();
    this.init();
  }

  private init() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((urlQuery: UrlQuery) => {
        const newQuery = this.createQueryFromUrlQuery(urlQuery);

        this.query.next(newQuery);
      })
    );

    const response = this.query$
      .pipe(
        tap( () => this.changeLoading(true) ),
        debounceTime(1000),
        switchMap(({ paging, filter }) =>
          this.productsService.getProductsByFilters(paging.skip, paging.limit, filter)
        ),
        tap( () => this.changeLoading(false) ),
        share()
      );

    this.products$ = response
      .pipe(map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }

        throw {
          message: '1incorrect data'
        };
      }));

    this.productsQuantity$ = response
      .pipe(map(response => {
        if (response?.quantity !== undefined && Number.isInteger(response.quantity)) {
          return response.quantity;
        }

        throw {
          message: '2incorrect data'
        };
      }));
  }

  public changeLoading(newValue: boolean) {
    if (this.loading.value !== newValue) {
      this.loading.next(newValue);
    }
  }

  public createQueryFromUrlQuery(urlQuery: UrlQuery): Query {
    const {
      skip,
      limit,
      category,
      minPrice,
      maxPrice,
      sizes,
      brands,
      search,
    } = urlQuery;

    const query: Query = {
      paging: {
        limit: 9
      },
      filter: {
      },
    };

    const skipNumber = Number(skip);
    if (skipNumber) {
      query.paging.skip = skipNumber;
    }
    const limitNumber = Number(limit);
    if (limitNumber) {
      query.paging.limit = limitNumber;
    }

    if (category) {
      query.filter.category = category;
    }
    const min = Number(minPrice);
    if (min) {
      query.filter.minPrice = min;
    }
    const max = Number(maxPrice);
    if (max) {
      query.filter.maxPrice = max;
    }
    if (sizes) {
      const sizesNormalized = Array.isArray(sizes)
        ? sizes
        : [sizes];
      query.filter.sizes = sizesNormalized;
    }
    if (brands) {
      const brandsNormalized = Array.isArray(brands)
        ? brands
        : [brands];
      query.filter.brands = brandsNormalized;
    }
    if (search) {
      query.filter.search = search;
    }

    return query;
  }

  public createNewUrl({ filter, paging }: Query): string {
    let url = '/products?';

    for (const key in paging) {
      if (paging.hasOwnProperty(key)) {
        const value = paging[key];
        url += `${key}=${value}&`;
      }
    }

    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        const unnormalized = filter[key];

        const values = Array.isArray(unnormalized) ? unnormalized : [unnormalized];

        for (const value of values) {
          url += `${key}=${value}&`;
        }
      }
    }

    return url;
  }

  public resetSearchQuery() {
    const newQuery = this.query.value;
    delete newQuery.filter.search;

    this.router.navigateByUrl(this.createNewUrl(newQuery));
  }
}
