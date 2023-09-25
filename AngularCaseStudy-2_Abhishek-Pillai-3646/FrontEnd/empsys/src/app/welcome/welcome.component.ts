import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  // userData: any;
  // employeeData: any[] = [];
  userData: any;
  username: string;
  dob: string;

  constructor(private http: HttpClient,private userService:UserService,private router:Router) { }
  ngOnInit(): void {
    // Retrieve the username and dob from the UserService
    this.username = this.userService.getUsername();
    this.dob = this.userService.getDob();

    // Fetch user data based on the username and dob
    this.userService.getUserInfo().subscribe(
      (userInfo) => {
        this.userData = userInfo;
      },
      (error) => {
        console.error('Error fetching user data: ', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
    }
  // ngOnInit(): void {
  //   // Fetch all employees' data
  //   this.http.get<any[]>('http://localhost:3000/get-all-employees').subscribe((data) => {
  //     this.employeeData = data;
  //   });
  }
  // ngOnInit(): void {
  //   // Fetch user data using the stored username and dob
  //   const username = this.userService.getUsername();
  //   const dob = this.userService.getPassword();

  //   // Send a POST request with username and dob in the request body
  //   this.http.post<any>('http://localhost:3000/get-user-info', { username, dob }).subscribe((userInfo) => {
  //     this.userData = userInfo;
  //   });
  // }
