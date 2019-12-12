export class EditUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  newPassword: string;
  oldPassword: string;
  role: string;

  constructor(
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    newPassword?: string,
    oldPassword?: string,
    role?: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.newPassword = newPassword;
    this.oldPassword = oldPassword;
    this.role = role;
  }
}