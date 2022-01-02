import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
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
  hideButton: boolean = true;
  hideLoader: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public login() {
    this.userDto.email = this.email;
    this.userDto.password = this.password;
    this.displayLoader();

    this.userService.login(this.userDto)
      .then(
        (resp: any) => {
          this.displaySuccessFeedback();

          setTimeout(() => {
            this.loginSucceded(resp);
          }, 1000);
        })
      .catch(
        (error) => {
          this.displayErrorFeedback();

          setTimeout(() => {
            this.router.navigate(['/register']);
          }, 1000);
        }
      );
  }
  
  public displayLoader(): void {
    this.hideButton = false;
    document.getElementById("loader")!.classList.add("loader");
  }

  public displaySuccessFeedback(): void {
    this.hideLoader = false;
    document.getElementById("feedback")!.classList.add("loader-success");
  }

  public displayErrorFeedback(): void {
    this.hideLoader = false;
    document.getElementById("feedback")!.classList.add("loader-error");
  }

  public loginSucceded(resp: any): void {
    window.sessionStorage.setItem("token", resp.token);
    this.router.navigate(['/']);
  }

}
