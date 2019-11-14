import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { switchMap, debounceTime, map, share } from 'rxjs/operators';

import { Filter, Product } from 'src/app/shared/models';
import { ListSelectComponent } from 'src/app/shared/components';
import { ProductsService } from 'src/app/shared/services';

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

  private readonly subscriptions: Subscription[] = [];
  private readonly filter = new BehaviorSubject<Filter>({});

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe(({ search }) => {
        if (search) {
          const newFilter = {
            ...this.filter.value,
            search
          };

          this.filter.next(newFilter);
        }
      })
    );

    this.products$ = this.filter
      .pipe(debounceTime(1000))
      .pipe(switchMap((filter: Filter) =>
        this.productsService.getProductsByFilters(0, 0, filter)
      ))
      .pipe(map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }

        throw {
          message: 'incorrect data'
        };
      }))
      .pipe(share());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public readonly newCategory = ([category]: string[]) => {
    const newFilter = {
      ...this.filter.value,
      category
    };

    if (!category) {
      delete newFilter.category;
    }

    this.filter.next(newFilter);
  }

  public readonly newPriceRange = ([minPrice, maxPrice]: number[]) => {
    const newFilter = {
      ...this.filter.value,
      minPrice,
      maxPrice
    };

    this.filter.next(newFilter);
  }

  public readonly newSizes = (sizes: string[]) => {
    const newFilter = {
      ...this.filter.value,
      sizes
    };

    this.filter.next(newFilter);
  }

  public readonly newBrands = (brands: string[]) => {
    const newFilter = {
      ...this.filter.value,
      brands
    };

    this.filter.next(newFilter);
  }

}
