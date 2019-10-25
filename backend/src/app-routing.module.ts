import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [
];

@Module({
  imports: [RouterModule.forRoutes(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
