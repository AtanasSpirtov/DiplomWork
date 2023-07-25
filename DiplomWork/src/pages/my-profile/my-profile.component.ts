import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import {LoggedUser, User} from "../../model/User";
import {Location} from "@angular/common";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  user: LoggedUser
  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
  }

  convertUserPasswordToStars() {
    return this.user.password.replace(/./g, '*')
  }

  navigateBack() {
    this.location.back()
  }
}
