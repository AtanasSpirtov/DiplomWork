import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {LoggedUserWithRoleUser} from "../../model/User";

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  usernameFormControl = new FormControl('', [Validators.required]);

  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10,15}")])

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }
  createUser() {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid && this.emailFormControl.valid && this.phoneFormControl.valid) {
      let user = new LoggedUserWithRoleUser(
        this.usernameFormControl.value,
        this.passwordFormControl.value,
        this.emailFormControl.value,
        this.phoneFormControl.value)


      this.userService.signUp(user)
        .subscribe(() =>
        this.router.navigate(['/login']));
    }
  }
  navigateToLogin() {
    this.router.navigate(["login"])

  }
}
