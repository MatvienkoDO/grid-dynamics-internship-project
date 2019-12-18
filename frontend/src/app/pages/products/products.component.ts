import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Filter, Paging, Product, CardProduct } from 'src/app/shared/models';
import { ListSelectComponent } from 'src/app/shared/components';
import {
  CartService,
  FavouritesService,
  ProductFilterService,
  Query,
} from 'src/app/shared/services';

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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
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

  public products: Product[];
  public productsQuantity: number;
  public loading: boolean;
  public query: Query;
  public isProductsVisible = false;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService,
    private readonly productFilterService: ProductFilterService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.productFilterService.products$.subscribe((products) =>
        this.products = products
      ),
      this.productFilterService.productsQuantity$.subscribe((productsQuantity) =>
        this.productsQuantity = productsQuantity
      ),
      this.productFilterService.loading$.subscribe((loading) =>
        this.loading = loading
      ),
      this.productFilterService.query$.subscribe((query) =>
        this.query = query
      ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public readonly newCategory = ([category]: string[]) => {
    const newQuery = this.query;

    if (category) {
      newQuery.filter.category = category;
    } else {
      delete newQuery.filter.category;
    }

    this.router.navigateByUrl(this.createNewUrl(newQuery));
  }

  public readonly newPriceRange = ([minPrice, maxPrice]: number[]) => {
    const newQuery = this.query;
    newQuery.filter.minPrice = minPrice;
    newQuery.filter.maxPrice = maxPrice;

    this.router.navigateByUrl(this.createNewUrl(newQuery));
  }

  public readonly newSizes = (sizes: string[]) => {
    const newQuery = this.query;
    newQuery.filter.sizes = sizes;

    this.router.navigateByUrl(this.createNewUrl(newQuery));
  }

  public readonly newBrands = (brands: string[]) => {
    const newQuery = this.query;
    newQuery.filter.brands = brands;

    this.router.navigateByUrl(this.createNewUrl(newQuery));
  }

  public readonly loadMore = () => {
    const newQuery = this.query;
    const limit = newQuery.paging.limit || 0;
    newQuery.paging.limit = limit + 3;

    this.router.navigateByUrl(this.createNewUrl(newQuery));
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

  public changeLoading(newValue: boolean) {
    this.productFilterService.changeLoading(newValue);
  }

  public createQueryFromUrlQuery(urlQuery: UrlQuery) : Query {
    return this.productFilterService.createQueryFromUrlQuery(urlQuery);
  }

  public createNewUrl(query: Query): string {
    return  this.productFilterService.createNewUrl(query);
  }

  public readonly resetSearchQuery = () => {
    this.productFilterService.resetSearchQuery();
  }

}
