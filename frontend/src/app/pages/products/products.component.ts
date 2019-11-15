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

  private readonly subscriptions: Subscription[] = [];
  private readonly query = new BehaviorSubject<Query>({
    filter: {},
    paging: {
      limit: 9
    }
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe(({ search }) => {
        if (search) {
          const newQuery = this.query.value;
          newQuery.filter.search = search;
          this.query.next(newQuery);
        }
      })
    );

    const response = this.query
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
          message: 'incorrect data'
        };
      }));

    this.productsQuantity$ = response
      .pipe(map(response => {
        if (response && Number.isInteger(response.quantity)) {
          return response.quantity;
        }

        throw {
          message: 'incorrect data'
        };
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public readonly newCategory = ([category]: string[]) => {
    const newQuery = this.query.value;

    if (category) {
      newQuery.filter.category = category;
    } else {
      delete newQuery.filter.category;
    }

    this.query.next(newQuery);
  }

  public readonly newPriceRange = ([minPrice, maxPrice]: number[]) => {
    const newQuery = this.query.value;
    newQuery.filter.minPrice = minPrice;
    newQuery.filter.maxPrice = maxPrice;

    this.query.next(newQuery);
  }

  public readonly newSizes = (sizes: string[]) => {
    const newQuery = this.query.value;
    newQuery.filter.sizes = sizes;

    this.query.next(newQuery);
  }

  public readonly newBrands = (brands: string[]) => {
    const newQuery = this.query.value;
    newQuery.filter.brands = brands;

    this.query.next(newQuery);
  }

  public readonly loadMore = () => {
    const newQuery = this.query.value;
    const limit = newQuery.paging.limit || 0;
    newQuery.paging.limit = limit + 3;

    this.query.next(newQuery); 
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

}
