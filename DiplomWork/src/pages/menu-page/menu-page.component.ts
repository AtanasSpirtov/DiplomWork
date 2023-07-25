import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  showMenuIcons() {
    return localStorage.getItem('token') != null
  }

  navigateToLoginAndClearLocalStorage() {
    this.userService.logout()
    this.router.navigate(['login'])
  }

  navigateToMyProfile() {
    this.router.navigate(['my-profile'])
  }
}
