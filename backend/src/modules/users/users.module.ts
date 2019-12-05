import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userSchemaName, UserSchema } from '../authentication/models/user.schema';
import { UserService } from './services/user/user.service';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: userSchemaName, schema: UserSchema },
    ]),
  ],
  providers: [
    UserService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
