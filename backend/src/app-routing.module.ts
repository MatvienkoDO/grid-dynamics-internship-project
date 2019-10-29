import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';

import { ProductModelModule } from './modules/productModel/productModel.module';
import { ProductModule } from './modules/product/product.module';

const routes: Routes = [
  {
    path: '',
    module: ProductModule,
  },
  {
    path: '',
    module: ProductModelModule,
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
