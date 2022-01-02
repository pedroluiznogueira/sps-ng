import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/models/dto/user-dto/UserDto';
import { User } from 'src/app/models/user/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url?: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User): Promise<User | undefined> {
    const promise = this.http.post(`${this.url}/users/insert`, user).toPromise();
    return promise;
  }

  public login(userDto: UserDto): Promise<UserDto | undefined> {    
    const promise = this.http.post(`${this.url}/users/auth`, userDto).toPromise();
    return promise;
  }

  // private fetchData(){
  //   const promise = this.httpClient.get(this.apiUrl).toPromise();
  //   console.log(promise);  
  //   promise.then((data)=>{
  //     console.log("Promise resolved with: " + JSON.stringify(data));
  //   }).catch((error)=>{
  //     console.log("Promise rejected with " + JSON.stringify(error));
  //   });
  // }
}
