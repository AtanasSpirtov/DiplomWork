import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToLogin() {
    this.router.navigate(["login"])

  }
}
