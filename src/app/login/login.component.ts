import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
const userdetails={
  username:this.username,
  password:this.password
};

    this.loginservice.authenticate(userdetails).subscribe(
      data => {
        sessionStorage.setItem('username',userdetails.username);
        sessionStorage.setItem('token',data.token);
        this.router.navigate([''])
        this.invalidLogin = false
     
      },
      error => {
        this.invalidLogin = true
        alert("Please enter valid user name and password");

      }
    );

  }

}