import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/dto/user-dto/UserDto';
import { User } from 'src/app/models/user/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url?: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public register(user: User): void {
    console.log(user);    
    let obs = this.http.post(`${this.url}/users/insert`, user);
    obs
      .subscribe(
        (resp) => {
          console.log(resp);
        }
      );
  }

  public login(userDto: UserDto): void {    
    let obs = this.http.post(`${this.url}/users/auth`, userDto);
    obs
      .subscribe(
        (resp: any) => {
          console.log(resp);
          window.sessionStorage.setItem("token", resp.token);
          this.router.navigate(['/']);          
        }
      );
  }
}
