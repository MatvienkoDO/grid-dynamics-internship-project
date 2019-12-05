import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchemaName, UserSchema } from './models/user.schema';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: userSchemaName, schema: UserSchema }
    ]),
  ],
  exports: [],
  controllers: [AuthController],
  providers: [UserService]
})
export class AuthenticationModule {}
