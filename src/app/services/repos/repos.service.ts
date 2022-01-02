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

  public findRepo(term: string): Observable<Repos[]> {
    if (term.trim()) return of([]);
    let obs = this.http.get<Repos[]>(`${this.url}/repos/find/name/` + term);
    obs.subscribe(
      (res) => {
        console.log(res)
      }
    )

    return obs;
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
    // this.repos.splice(this.repos.indexOf(repo), 1);
  }
}
