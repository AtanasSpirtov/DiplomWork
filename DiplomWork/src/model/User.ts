export interface User {

  username: string;

  password: string;

}

export class LoggedUser implements User {
  password: string;
  username: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class LoggedUserWithRoleUser extends LoggedUser {
  override password: string;
  override username: string;

  email: string

  phone: string


  constructor(username: string, password: string, email: string, phone: string) {
    super(username, password);
    this.password = password;
    this.username = username;
    this.email = email;
    this.phone = phone;
  }
}
