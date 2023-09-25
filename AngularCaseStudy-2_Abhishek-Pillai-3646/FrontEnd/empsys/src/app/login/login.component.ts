import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    UserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  get UserName() {
    return this.loginForm.get('UserName');
  }

  get Password() {
    return this.loginForm.get('Password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Set the username and date of birth in the UserService
      this.userService.setUsernameAndPassword(formData.UserName, formData.Password);

      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const options = { headers: headers };

      this.http.post<any>('http://localhost:3000/login', JSON.stringify(formData), options).subscribe(
        (response) => {
          console.log(response);
          if (response && response.token) {
            // Store the token in local storage
            localStorage.setItem('token', response.token);

            // Fetch and store user data
            this.userService.getUserInfo().subscribe(
              (userInfo) => {
                // Store user data in the service
                this.userService.setUserData(userInfo);

                // Navigate to the welcome page
                this.router.navigate(['/welcome']);
              },
              (error) => {
                console.error('Error fetching user data: ', error);
                // Display an alert for any errors while fetching user data
                alert('Login successful, but an error occurred while fetching user data.');
              }
            );
          } else {
            alert('Login unsuccessful. Wrong username or password');
          }
        },
        (error) => {
          console.error('Login unsuccessful: ', error);
          // Display an alert for any other errors
          alert('Login unsuccessful. An error occurred.');
        }
      );
    }
  }
}
