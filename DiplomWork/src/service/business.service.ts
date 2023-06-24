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

  getAllBusinesses(): Observable<Business[]> {
    return this.http.get<Business[]>(`${this.apiUrl}/business/list`)
  }

  saveBusiness(business: Business): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/business/save`, business)
  }
}
