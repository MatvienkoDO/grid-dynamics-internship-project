import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  HomeComponent,
  ProductDetailsComponent,
  ProductsComponent,
} from '../../pages';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: '**',
    redirectTo: '',
    // TODO: make 'not found' notification
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
