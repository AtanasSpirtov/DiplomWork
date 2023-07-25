import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Business, Slot} from "../../model/Business";
import {LoggedUser} from "../../model/User";
import {BusinessService} from "../../service/business.service";
import {ConfirmationModalComponent} from "../dialogs/confirmation-modal.components";
import {take} from "rxjs";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-user-to-slot',
  templateUrl: './add-user-to-slot.component.html',
  styleUrls: ['./add-user-to-slot.component.scss']
})
export class AddUserToSlotComponent implements OnInit {

  business: Business
  constructor(private route: ActivatedRoute,
              private businessService: BusinessService,
              private location: Location,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.business = JSON.parse(this.route.snapshot.params['business'])
  }
  hasNoFreeSpaceOrPassed(slot: Slot) {
    return slot.allUsers.length >= slot.maxUsers || new Date(slot.date).getDate() < new Date().getDate()
  }

  getSlotStartAndEndTime(slot: Slot) {
    return `${slot.slotStartTime}h - ${slot.slotEndTime}h`
  }
  getUserNamesWithEmails(allUsers: LoggedUser[]) {
    return allUsers.length == 0 ? "No users on this slot or expired" : allUsers.map(user => `${user.username}[${user.email}]`).join(", ")
  }

  writeForSlot(businessId, slotId) {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Make appointment to current slot',
        message: 'Are you sure you want to make appointment for current slot.'
      }
    }).afterClosed()
      .pipe(take(1))
      .subscribe(confirmed => {
        if (confirmed) {
          this.businessService.addUserToBusinessSlot(businessId, slotId).subscribe( response =>
            this.navigateBack()
          )
        }
      });
  }

  navigateBack() {
    this.location.back()
  }
}
