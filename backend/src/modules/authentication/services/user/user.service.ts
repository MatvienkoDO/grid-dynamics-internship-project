import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../models/user.interface';
import { UserLoginDto } from '../../models/dto/UserLogin.dto';
import { UserSignupDto } from '../../models/dto/UserSignup.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  public async findBy(filterObject) {
    return await this.userModel.findOne(filterObject);
  }

  public async createUser(signupDto: UserSignupDto): Promise<User> {
    if (!signupDto.role) {
      signupDto.role = 'user';
    }
    const createdUser = new this.userModel(signupDto);
    return await createdUser.save();
  }

  public async isValidLoginDto(loginDto: UserLoginDto): Promise<boolean> {
    const user = await this.userModel.findOne({
      email: loginDto.email,
      password: loginDto.password
    });
    return !!user;
  }

  public async isValidSignupDto(signupDto: UserSignupDto): Promise<boolean> {
    return !!(signupDto.firstName &&
      signupDto.lastName &&
      signupDto.email &&
      signupDto.password);
  }

  public async isUnique(signupDto: UserSignupDto) {
    const user = await this.userModel.findOne({
      email: signupDto.email
    });
    return !user;
  }
}
