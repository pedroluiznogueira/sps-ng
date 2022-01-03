import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Repos } from 'src/app/models/repos/Repos';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  url?: string = "https://sps-test-java.herokuapp.com";
  repoName?: string;
  ownerName?: string;
  newRepo: Repos = new Repos();

  constructor(
    private http: HttpClient
  ) { }

  public displayRepos(): Observable<Repos> {
    let loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser')!);
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('token')
    });
    
    let obs = this.http.get(`${this.url}/repos/find/all/` + loggedUser.id, { headers: header });
    obs.subscribe(
      (res) => {
        console.log(res)
      }
    )
    return obs;
  }

  public findRepo(repoToFind: string): Promise<Repos | undefined> {
    let loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser')!);
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('token')
    });

    const promise = this.http.get(`${this.url}/repos/find/repo/by/name/${repoToFind}/by/user/id/${loggedUser.id}`, { headers: header }).toPromise();
    return promise;
  }

  public addRepo(repoUrl: string): Promise<Object | undefined>{
    let loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser')!);
    this.extractNameAndOwner(repoUrl);
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('token')
    });
    
    const promise = this.http.post(`${this.url}/repos/insert/repo/user/` + loggedUser.id, this.newRepo, { headers: header }).toPromise();
    return promise;
  }

  public extractNameAndOwner(repoUrl: string) {
    let counter = 0;
    for (let i = 0; i < repoUrl.length; i++) {
      
      if (repoUrl[i] == '/') counter++;
      if (counter == 3) {

        let subRepoUrl = repoUrl.slice(i + 1, repoUrl.length);
        for (let j = 0; j < subRepoUrl.length; j++) {
          
          if (subRepoUrl[j] == '/') {
            this.newRepo.name = subRepoUrl.slice(j + 1, subRepoUrl.length);
            this.newRepo.owner = subRepoUrl.slice(0, j);
            this.newRepo.url = repoUrl;
            this.newRepo.userName = window.sessionStorage.getItem('loggedUser')!;
            break;
          }
        }
        counter = 0;
      }
    }
  }

  public removeRepo(repo: Repos) {
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('token')
    });

    this.http.delete(`${this.url}/repos/delete/repo/` + repo.id, { headers: header })
    .subscribe(
      (resp) => {
        console.log(resp);   
      }
    )
  }

  public removeFoundRepo(): void {
    let foundRepo = JSON.parse(window.sessionStorage.getItem('foundRepo')!);    
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('token')
    });

    this.http.delete(`${this.url}/repos/delete/repo/` + foundRepo.id, { headers: header })
    .subscribe(
      (resp) => {
        console.log(resp);   
      }
    )
  }
}
