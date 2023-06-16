import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoggedUser, LoggedUserWithRoleUser, User} from "../model/User";
import {Message} from "../model/Message";
import {Options} from "../model/Options";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private readonly apiUrl = 'http://localhost:8080';

  login(username: string, password: string): Observable<string> {
    let user = new LoggedUser(username, password)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Information': JSON.stringify(user)
    })
    return this.http.get<string>(`${this.apiUrl}/login`, {headers})
  }

  logout() {
    window.localStorage.clear();
    return this.http.get<Message>(`${this.apiUrl}/loggingOut`);
  }

  signUp(user: LoggedUser) {
    const JSONObject = JSON.stringify(user);
    return this.http.post<Message>(`${this.apiUrl}/user/create`, JSONObject, Options.options);
  }
}
