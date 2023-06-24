import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {LoggedUser} from "../../model/User";

@Component({
  selector: 'app-sign-up-business',
  templateUrl: './sign-up-business.component.html',
  styleUrls: ['./sign-up-business.component.scss']
})
export class SignUpBusinessComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  usernameFormControl = new FormControl('', [Validators.required]);

  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10,15}")])

  businessFormControl = new FormControl('', [Validators.required])
  businesses: Business[] = [Business.SERVICES, Business.MEDICINE, Business.COMMERCE, Business.IT, Business.OTHER];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  createUser() {
    if (
      this.usernameFormControl.valid &&
      this.passwordFormControl.valid &&
      this.emailFormControl.valid &&
      this.phoneFormControl.valid &&
      this.businessFormControl.valid
    ) {
      let user = new LoggedUser(
        this.usernameFormControl.value,
        this.passwordFormControl.value,
        this.emailFormControl.value,
        this.phoneFormControl.value,
        true,
        this.businessFormControl.value
      )


      this.userService.signUp(user)
        .subscribe(() =>
          this.router.navigate(['/login']));
    }
  }

  navigateToLogin() {
    this.router.navigate(["login"])

  }

  getBusinessLabelValue(business: Business) {
    return BusinessesLabel[business]
  }

}

export enum Business {
  SERVICES = "SERVICES",
  MEDICINE = "MEDICINE",
  COMMERCE = "COMMERCE",
  IT = "IT",
  OTHER = "OTHER"
}

export const BusinessesLabel: { [key in Business]: string } = {
  [Business.SERVICES]: "Services",
  [Business.MEDICINE]: "Medicine",
  [Business.COMMERCE]: "Commerce",
  [Business.IT]: "Information technology",
  [Business.OTHER]: "Other"
}
