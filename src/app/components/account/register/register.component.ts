import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  hideButton: boolean = true;
  hideLoader: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public register(): void {
    this.user!.name = this.name;
    this.user!.email = this.email;
    this.user!.password = this.password;
    this.displayLoader();

    this.userService.register(this.user!)
      .then(
        () => {
          this.displaySuccessFeedback();
    
          setTimeout(() => {
            this.registrationSucceded();
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

  public registrationSucceded(): void {
    this.router.navigate(['/login']);
  }

}
