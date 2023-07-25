import {Component, OnInit} from '@angular/core';
import {BusinessService} from "../../service/business.service";
import {Business, Slot} from "../../model/Business";
import {LoggedUser} from "../../model/User";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss']
})
export class UserHomePageComponent implements OnInit {

  allBusinesses: Business[]
  filterForm: FormGroup;

  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  filteredBusinesses: Business[];

  constructor(private businessService: BusinessService, private router: Router) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    this.daysOfWeek = this.daysOfWeek.slice(currentDay - 1);
    this.filterForm = new FormGroup({
      businessName: new FormControl(null),
      businessField: new FormControl(null),
      telephone: new FormControl(null),
      selectedDayOfWeek: new FormControl(null)
    })
  }

  ngOnInit(): void {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();

    const daysUntilSunday = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;

    const endOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysUntilSunday);

    this.businessService.getAllBusinesses(true)
      .subscribe(allBusinesses => {
        allBusinesses.forEach((business: Business) => {
            business.workingSlots = business.workingSlots.filter((slot: Slot) => {
              const slotDate = new Date(slot.date);
              return slotDate.getDate() >= currentDate.getDate() && slotDate.getDate() <= endOfWeek.getDate();
            });
            this.allBusinesses = allBusinesses
            this.filteredBusinesses = allBusinesses
          }
        )
      })
  }

  getImage(picture: string) {
    return `data:image/jpeg;base64,${picture}`;
  }

  hasFreeSpace(slot: Slot) {
    return slot.allUsers.length < slot.maxUsers
  }

  getSlotStartAndEndTime(slot: Slot) {
    return `${slot.slotStartTime}h - ${slot.slotEndTime}h`
  }

  getUserNamesWithEmails(allUsers: LoggedUser[]) {
    return allUsers.length == 0 ? "No users on this slot" : allUsers.map(user => `${user.username}[${user.email}]`).join(", ")
  }

  getAvailableSlotsForToday(workingSlots: Slot[]) {
    return workingSlots.sort((slot1, slot2) => {
      if (slot1.slotStartTime < slot2.slotEndTime) {
        return -1;
      } else if (slot1.slotStartTime > slot2.slotEndTime) {
        return 1;
      } else {
        return 0;
      }
    })
  }

  viewBusiness(id: number) {
    let currentBusiness = this.allBusinesses.find(business => business.id == id)
    this.router.navigate(['view-business', {business: JSON.stringify(currentBusiness)}])
  }

  makeAppointment(id: number) {
    let currentBusiness = this.allBusinesses.find(business => business.id == id)
    this.router.navigate(['make-appointment', {business: JSON.stringify(currentBusiness)}])
  }

  getMaxUsersPerSlot(business: Business) {
    if(business.workingSlots.length == 0){
      return ""
    } else return business.workingSlots[0].maxUsers
  }

  triggerFilter() {
    this.filteredBusinesses = this.allBusinesses
      .filter(business =>this.filterForm.get("businessName").value == null || business.name.toLowerCase().includes(this.filterForm.get("businessName").value.toLowerCase()))
      .filter(business =>this.filterForm.get("businessField").value == null || business.businessField.toLowerCase().includes(this.filterForm.get("businessField").value.toLowerCase()))
      .filter(business =>this.filterForm.get("telephone").value == null || business.telephone.toLowerCase().includes(this.filterForm.get("telephone").value.toLowerCase()))
      .filter(business => {
        const currentDate = new Date();
        const diffDays = this.daysOfWeek.indexOf(this.filterForm.get("selectedDayOfWeek").value) - currentDate.getDay();
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate() + diffDays);
        console.log(newDate)
        return this.filterForm.get("selectedDayOfWeek").value == null || business.workingSlots.some(slot =>new Date(slot.date).getDate() == newDate.getDate())
      })
  }
}
