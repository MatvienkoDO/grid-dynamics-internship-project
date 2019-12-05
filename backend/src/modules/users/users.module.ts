import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userSchemaName, UserSchema } from '../authentication/models/user.schema';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: userSchemaName, schema: UserSchema },
    ]),
  ],
  providers: [
    UserService,
  ],
})
export class UsersModule {}
