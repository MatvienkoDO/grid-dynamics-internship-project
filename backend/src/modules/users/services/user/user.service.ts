import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument } from '../../../authentication/models/user-document.interface';
import { User } from '../../models/user';
import { userSchemaName } from '../../../authentication/models/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(userSchemaName) private readonly userModel: Model<UserDocument>,
  ) { }

  async findById(id: string): Promise<User | null> {
    const query = await this.userModel.findById(id);
    if (!query) {
      return null;
    }

    const result: User = {
      firstName: query.firstName,
      lastName: query.lastName,
      email: query.email,
      role: query.role,
    };

    return result;
  }
}
