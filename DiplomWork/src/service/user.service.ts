import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoggedUser} from "../model/User";
import {Message} from "../model/Message";
import {Options} from "../model/Options";
import {LoginResponse} from "../pages/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private readonly apiUrl = 'http://localhost:8080';

  login(username: string, password: string): Observable<LoginResponse> {
    window.localStorage.clear()
    let user = new LoggedUser(username, password, null, null, null, null)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Information': JSON.stringify(user)
    })
    return this.http.get<LoginResponse>(`${this.apiUrl}/login`, {headers})
  }

  logout() {
    window.localStorage.clear();
    return this.http.get<Message>(`${this.apiUrl}/loggingOut`);
  }

  signUp(user: LoggedUser) {
    console.log(user)
    return this.http.post<Message>(`${this.apiUrl}/user/create`, user);
  }
}
