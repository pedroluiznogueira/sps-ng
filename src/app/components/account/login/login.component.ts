import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/dto/user-dto/UserDto';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email?: string;
  password?: string;
  userDto: UserDto = new UserDto();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.userDto.email = this.email;
    this.userDto.password = this.password;
    this.userService.login(this.userDto);
  }

}
