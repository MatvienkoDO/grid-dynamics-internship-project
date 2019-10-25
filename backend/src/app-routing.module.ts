import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';

import { TestModule } from './modules/test/test.module';

const routes: Routes = [
  {
    path: 'test',
    module: TestModule
  }
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
