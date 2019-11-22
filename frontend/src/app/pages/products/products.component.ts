import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { switchMap, debounceTime, map, share, tap } from 'rxjs/operators';

import { Filter, Paging, Product, CardProduct } from 'src/app/shared/models';
import { ListSelectComponent } from 'src/app/shared/components';
import { ProductsService, CartService, FavouritesService } from 'src/app/shared/services';

interface Query {
  filter: Filter;
  paging: Paging;
};

interface UrlQuery {
  skip?: string;
  limit?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sizes?: string | string[];
  brands?: string | string[];
  search?: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {

  public readonly categoryOptions: ListSelectComponent.Options = [
    {
      title: 'Man',
      value: 'Man'
    },
    {
      title: 'Women',
      value: 'Women'
    },
    {
      title: 'Childrens',
      value: 'Children'
    },
    {
      title: 'Hot Deals',
      value: 'Hot Deals'
    },
  ];

  public readonly sizesOptions: ListSelectComponent.Options = [
    {
      title: 'Small',
      value: 's'
    },
    {
      title: 'Midum',
      value: 'm'
    },
    {
      title: 'Larg',
      value: 'l'
    },
    {
      title: 'X Larg',
      value: 'xl'
    },
  ];

  public readonly brandsOptions: ListSelectComponent.Options = [
    {
      title: 'Reebok',
      value: 'Reebok'
    },
    {
      title: 'Addidas',
      value: 'Addidas'
    },
    {
      title: 'Nike',
      value: 'Nike'
    },
    {
      title: 'Active',
      value: 'Active'
    },
  ];

  public products$: Observable<Product[]>;
  public productsQuantity$: Observable<number>;
  public readonly loading$ = new BehaviorSubject<boolean>(true);
  public readonly query$ = new BehaviorSubject<Query>({
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
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService,
  ) { }

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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public readonly newCategory = ([category]: string[]) => {
    const newQuery = this.query$.value;

    if (category) {
      newQuery.filter.category = category;
    } else {
      delete newQuery.filter.category;
    }

    this.applyNewUrl(newQuery);
  }

  public readonly newPriceRange = ([minPrice, maxPrice]: number[]) => {
    const newQuery = this.query$.value;
    newQuery.filter.minPrice = minPrice;
    newQuery.filter.maxPrice = maxPrice;

    this.applyNewUrl(newQuery);
  }

  public readonly newSizes = (sizes: string[]) => {
    const newQuery = this.query$.value;
    newQuery.filter.sizes = sizes;

    this.applyNewUrl(newQuery);
  }

  public readonly newBrands = (brands: string[]) => {
    const newQuery = this.query$.value;
    newQuery.filter.brands = brands;

    this.applyNewUrl(newQuery);
  }

  public readonly loadMore = () => {
    const newQuery = this.query$.value;
    const limit = newQuery.paging.limit || 0;
    newQuery.paging.limit = limit + 3;

    this.applyNewUrl(newQuery);
  }

  public readonly showDetails = (productsId: string) => {
    this.router.navigateByUrl(`/product/${productsId}`);
  }

  public readonly addToCart = (cardProduct: CardProduct) => {
    this.cartService.addToCart(cardProduct);
  }

  public readonly addToFavourites = (cardProduct: CardProduct) => {
    this.favouritesService.addToFavourites(cardProduct);
  }

  private changeLoading(newValue: boolean) {
    if (this.loading$.value !== newValue) {
      this.loading$.next(newValue);
    }
  }

  toggleProductBlock() {
    const checkBox = document.getElementById("checkbox-filter") as HTMLInputElement;
    const cardBlock = document.getElementById("cards") as HTMLElement;
    (checkBox.checked) ? cardBlock.style.display = "none" : cardBlock.style.display = "block";
  }
  private createQueryFromUrlQuery(urlQuery: UrlQuery): Query {
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

  private applyNewUrl(query: Query) {
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

    this.router.navigateByUrl(url);
  }

}
