import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/models/dto/user-dto/UserDto';
import { User } from 'src/app/models/user/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url?: string = "https://sps-test-api-java.herokuapp.com";

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User): Promise<User | undefined> {
    const promise = this.http.post(`${this.url}/users/register`, user).toPromise();
    return promise;
  }

  public login(userDto: UserDto): Promise<UserDto | undefined> {
    const promise = this.http.post(`${this.url}/users/auth`, userDto).toPromise();
    return promise;
  }

  public shareLoggedUser(token: string, email: string): void {
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ token
    });

    const promise = this.http.get(`${this.url}/users/find/by/email/` + email, { headers: header }).toPromise();
    promise
      .then(
        (resp: any) => {
          console.log('User: ' + JSON.stringify(resp));
          let obj: any = {
            "id": resp.id,
            "name": resp.name
          }
          window.sessionStorage.setItem('loggedUser', JSON.stringify(obj))
        }
      )
      .catch(
        (error) => {
          console.log('Error: ' + JSON.stringify(error));
        }
      )
  }
}
