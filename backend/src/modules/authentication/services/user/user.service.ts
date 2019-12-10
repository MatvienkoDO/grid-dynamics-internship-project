import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, genSalt, compare } from 'bcrypt';

import { UserDocument } from '../../models/user-document.interface';
import { UserLoginDto } from '../../models/dto/UserLogin.dto';
import { UserSignupDto } from '../../models/dto/UserSignup.dto';
import { userSchemaName } from '../../models/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(userSchemaName) private readonly userModel: Model<UserDocument>) { }

  public async findBy(filterObject) {
    return await this.userModel.findOne(filterObject);
  }

  public async createUser(signupDto: UserSignupDto): Promise<UserDocument> {
    signupDto.password = await hash(signupDto.password, await genSalt());

    signupDto.role = signupDto.role || 'user';

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

  async getUserByLoginPassword(login: string, password: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({
      email: login,
    });

    if (!user) {
      return undefined;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return undefined;
    }

    return user;
  }
}
