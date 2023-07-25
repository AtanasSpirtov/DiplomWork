import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoggedUser} from "../model/User";
import {Message} from "../model/Message";
import {LoginResponse} from "../pages/login/login.component";
import {Business} from "../model/Business";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) {
  }

  private readonly apiUrl = 'http://localhost:8080';

  getAllBusinesses(forUser: boolean): Observable<Business[]> {
    return this.http.get<Business[]>(`${this.apiUrl}/business/list/${forUser}`)
  }

  saveBusiness(business: Business): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/business/save`, business)
  }

  deleteBusinessById(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.apiUrl}/business/delete/${id}`)
  }

  propagateSlotHoursForCurrentWeek(businessId: number) {
    return this.http.post<Message>(`${this.apiUrl}/business/propagate-slots/${businessId}`, {})
  }
  addUserToBusinessSlot(businessId: number, slotId: number) {
    console.log("here")
    return this.http.post<Message>(`${this.apiUrl}/business/add-user-to-slot`, new AddUserToSlotRequest(businessId, slotId))
  }

}

export class AddUserToSlotRequest {
  businessId: number;

  slotId: number;


  constructor(businessId: number, slotId: number) {
    this.businessId = businessId;
    this.slotId = slotId;
  }
}
