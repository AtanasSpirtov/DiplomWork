import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Business, Slot} from "../../model/Business";
import {LoggedUser} from "../../model/User";
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-business',
  templateUrl: './view-business.component.html',
  styleUrls: ['./view-business.component.scss']
})
export class ViewBusinessComponent implements OnInit {
  business: Business
  constructor(private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.business = JSON.parse(this.route.snapshot.params['business'])
  }

  hasFreeSpace(slot: Slot) {
    return slot.allUsers.length < slot.maxUsers
  }

  getSlotStartAndEndTime(slot: Slot) {
    return `${slot.slotStartTime}h - ${slot.slotEndTime}h`
  }
  getImage(picture: string) {
    return `data:image/jpeg;base64,${picture}`;
  }

  getUserNamesWithEmails(allUsers: LoggedUser[]) {
    return allUsers.length == 0 ? "No users on this slot" : allUsers.map(user => `${user.username}[${user.email}]`).join(", ")
  }

  navigateBack() {
    this.location.back();
  }

  getMaxUsersPerSlot(business: Business) {
    return business.workingSlots.length == 0 ? "No slots Defined" : business.workingSlots[0].maxUsers
  }
}
