import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }
  loginForm(username: string, password: string) {
    if (window.localStorage.getItem("token") != null) {
      window.localStorage.clear()
    }
    this.userService.login(username, password)
      .subscribe(
        () => {
          let successfulUrl = '/successfulLoggedIn';
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([successfulUrl]);
          });
        })

  }
  navigateToSignUpUser() {
    this.router.navigate(["signUp", "user"])
  }

  navigateToSignUpBusiness() {
    this.router.navigate(["signUp", "business"])
  }
}
