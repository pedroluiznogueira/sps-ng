import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url?: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
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
}
