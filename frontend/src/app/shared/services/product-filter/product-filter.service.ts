import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Product, Paging, Filter } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '..';
import { UrlQuery } from 'src/app/pages';
import { tap, debounceTime, switchMap, share, map } from 'rxjs/operators';

export interface Query {
  filter: Filter;
  paging: Paging;
};

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

  private products$: Observable<Product[]>;
  private productsQuantity$: Observable<number>;
  private readonly loading$ = new BehaviorSubject<boolean>(true);
  private readonly query$ = new BehaviorSubject<Query>({
    filter: {},
    paging: {
      limit: 9
    }
  });
  
  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly router: Router,
  ) { 
    this.query$.asObservable;
    this.loading$.asObservable;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((urlQuery: UrlQuery) => {
        const newQuery = this.createQueryFromUrlQuery(urlQuery);

        this.query$.next(newQuery);
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
        if (response && Number.isInteger(response.quantity)) {
          return response.quantity;
        }

        throw {
          message: '2incorrect data'
        };
      }));
  }

  private changeLoading(newValue: boolean) {
    if (this.loading$.value !== newValue) {
      this.loading$.next(newValue);
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

  public createNewUrl(query: Query): string {
    let url = '/products?';

    for(const key in query.paging) {
      url += `${key}=${query.paging[key]}&`;
    }

    for(const key in query.filter) {
      const unnormalized = query.filter[key];
      const values = Array.isArray(unnormalized)
        ? unnormalized
        : [unnormalized];

      for(const value of values) {
        url += `${key}=${value}&`;
      }
    }

    return url;
  }

  public readonly resetSearchQuery = () => {
    const newQuery = this.query$.value;
    delete newQuery.filter.search;

    this.router.navigateByUrl(this.createNewUrl(newQuery));
  }
}
