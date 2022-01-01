import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from './../../../models/user/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name?: string;
  email?: string;
  password?: string;
  user?: User = new User();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public register(): void {
    this.user!.name = this.name;
    this.user!.email = this.email;
    this.user!.password = this.password;

    this.userService.register(this.user!);
  }

}
