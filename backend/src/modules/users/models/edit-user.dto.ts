export class EditUserDto {

  constructor(
    public id: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public newPassword?: string,
    public oldPassword?: string,
    public role?: string,
  ) {
  }
}
