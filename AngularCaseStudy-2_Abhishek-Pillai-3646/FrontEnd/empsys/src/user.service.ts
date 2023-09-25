import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string;
  private dob: string;
  private userData: any;
  private token: string;

  constructor(private http: HttpClient) {}

  setUsernameAndPassword(username: string, dob: string): void {
    this.username = username;
    this.dob = dob;
  }

  getUsername(): string {
    return this.username;
  }

  getDob(): string {
    return this.dob;
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getUserInfo(): Observable<any> {
    const url = 'http://localhost:3000/get-user-info';

    const requestBody = {
      username: this.getUsername(),
      dob: this.getDob(),
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });

    return this.http.post<any>(url, requestBody, { headers });
  }

  setUserData(userInfo: any): void {
    console.log(userInfo);
    this.userData = userInfo;
  }

  getUserData(): any {
    return this.userData;
  }
}
