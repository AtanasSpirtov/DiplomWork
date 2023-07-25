import {LoggedUser} from "./User";

export class Business {
  id: number | undefined;
  name: string;
  location: string;
  telephone: string;
  picture: string;
  businessField: string;
  startTime: string;
  endTime: string;
  workingSlots: Slot[];


  constructor(name: string, location: string, telephone: string, picture: string, businessField: string, startTime: string, endTime: string, workingSlots: Slot[]) {
    this.name = name;
    this.location = location;
    this.telephone = telephone;
    this.picture = picture;
    this.businessField = businessField;
    this.startTime = startTime;
    this.endTime = endTime;
    this.workingSlots = workingSlots;
  }
}

export class Slot {
  id : string | undefined
  slotStartTime: string;
  slotEndTime: string;
  allUsers: LoggedUser[];
  maxUsers: number

  date: string


  constructor(slotStartTime: string, slotEndTime: string, allUsersInSlot: LoggedUser[], maxUsers: number, date: string) {
    this.slotStartTime = slotStartTime;
    this.slotEndTime = slotEndTime;
    this.allUsers = allUsersInSlot;
    this.maxUsers = maxUsers;
    this.date = date;
  }
}
