import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Repos } from 'src/app/models/repos/Repos';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  url?: string = "http://localhost:8080";
  repoName?: string;
  ownerName?: string;
  newRepo: Repos = new Repos();

  constructor(
    private http: HttpClient
  ) { }

  public displayRepos(): Observable<Repos> {
    let name = window.sessionStorage.getItem('loggedUser');
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('token')
    });
    
    let obs = this.http.get(`${this.url}/users/find/all/repos/` + name, { headers: header });
    obs.subscribe(
      (res) => {
        console.log(res)
      }
    )
    return obs;
  }

  public findRepo(repoToFind: string): Promise<Repos | undefined> {
    let name = window.sessionStorage.getItem('loggedUser');
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('token')
    });

    const promise = this.http.get(`${this.url}/users/find/repo/from/user/${name}/by/name/${repoToFind}`, { headers: header }).toPromise();
    return promise;
  }

  public addRepo(repoUrl: string) {
    this.extractNameAndOwner(repoUrl);
    // this.repos.push(this.newRepo);
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

    this.http.post(`${this.url}/users/delete/repo`, repo, { headers: header })
    .subscribe(
      (resp) => {
        console.log(resp);   
      }
    )
  }

  public removeFoundRepo(foundRepoName: string): void {
    let header: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('token')
    });

    const promise = this.findRepo(foundRepoName);
  }
}
