import {Business} from "../pages/sign-up-business/sign-up-business.component";

export interface User {

  username: string;

  password: string;

}

export class LoggedUser implements User {
  password: string;
  username: string;

  email: string | null

  phone: string | null

  isBusiness: boolean | null

  businessType: Business | null

  constructor(username: string, password: string, email: string | null, phone: string | null, isBusiness: boolean | null, businessType: Business | null) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.isBusiness = isBusiness
    this.businessType = businessType
  }
}
