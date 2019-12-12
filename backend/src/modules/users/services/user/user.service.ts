import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument } from '../../../authentication/models/user-document.interface';
import { User } from '../../models/user';
import { userSchemaName } from '../../../authentication/models/user.schema';
import { EditUserDto } from '../../models/edit-user.dto';
import { hash, genSalt, compare } from 'bcrypt';

interface FormError {
  property: string;
  message: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(userSchemaName) private readonly userModel: Model<UserDocument>,
  ) { }

  public async findById(id: string): Promise<User | null> {
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

  public update(userDto: EditUserDto) {
    return this.userModel.findByIdAndUpdate(
      userDto.id,
      userDto,
    );
  }

  public async validate(userDto: EditUserDto) {
    const errors = [];
    const user = await this.userModel.findById(userDto.id);
    
    // Checks if first name is not empty
    if (userDto.firstName && userDto.firstName.length === 0) {
      errors.push({
        property: 'firstName',
        message: 'First name should not be empty',
      });
    }

    // Checks if last name is not empty
    if (userDto.lastName && userDto.lastName.length === 0) {
      errors.push({
        property: 'lastName',
        message: 'Last name should not be empty',
      });
    }

    // Checks if email is not empty and is unique
    if (userDto.email && !(await this.isUnique(userDto.email))) {
      errors.push({
        property: 'email',
        message: 'Email already exists',
      });
    }

    // Checks if database password and client password is equal
    if (
      userDto.oldPassword &&
      !(await compare(userDto.oldPassword, user.password))
    ) {
      errors.push({
        property: 'oldPassword',
        message: 'Old password is not valid',
      });
    }

    // Checks if new password is equal or more than 6 symbols
    if (
      userDto.newPassword &&
      userDto.newPassword.length < 6
    ) {
      errors.push({
        property: 'newPassord',
        message: 'Password should be more or equal than 6 symbols',
      });
    }

    if (errors.length) {
      return {
        success: false,
        errors,
      };
    }

    if (userDto.newPassword) {
      userDto.newPassword = await hash(userDto.newPassword, await genSalt());
    }
    const result = await this.userModel.updateOne(
      {_id: userDto.id},
      { ...userDto, password: userDto.newPassword },
    );

    return {
      success: true,
      user: result,
    };
  }

  private async isUnique(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({
      email,
    });

    return !user;
  }
}
