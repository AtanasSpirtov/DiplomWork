import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToSignUpUser() {
    this.router.navigate(["signUp", "user"])
  }

  navigateToSignUpBusiness() {
    this.router.navigate(["signUp", "business"])
  }
}
