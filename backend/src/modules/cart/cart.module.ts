import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchemaName, CartSchema } from './models/cart.schema';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthGuard } from '../authentication/guards/auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: cartSchemaName, schema: CartSchema }
    ]),
  ],
  providers: [CartService],
  exports: [CartService],
  controllers: [CartController]
})
export class CartModule {}
