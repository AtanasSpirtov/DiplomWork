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
    this.userService.login(username, password)
      .subscribe(
        userDefaultInformation => {
          let homePage : string;
          console.log(userDefaultInformation.authorities[0] == "regularUser");
          if(userDefaultInformation.authorities[0] == "regularUser"){
            homePage = 'user-home'
          } else homePage = 'business-home'
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([homePage]);
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

export class LoginResponse {
  username: string
  authorities: string[]


  constructor(username: string, authorities: string[]) {
    this.username = username;
    this.authorities = authorities;
  }
}
