import { Component, OnInit } from '@angular/core';
import { Repos } from 'src/app/models/repos/Repos';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { ReposService } from 'src/app/services/repos/repos.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  repos: Array<Repos> = new Array();
  repoUrl?: string;
  repoToFind?: string;
  foundRepo: Repos = new Repos();
  hideList: boolean = true;
  showFoundRepo: boolean = false;
  hideButton: boolean = true;
  hideLoader: boolean = true;
  hideFeedback: boolean = true;

  constructor(
    private reposService: ReposService
  ) { }

  ngOnInit(): void {
    this.displayRepos();
  }

  public findRepo(): void {
    this.hideList = false;
    
    this.displayLoader();
    this.reposService.findRepo(this.repoToFind!)
      .then(
        (resp: any) => {
          this.displaySuccessFeedback();
          setTimeout(() => {
            this.hideFeedback = false;
            this.foundRepo = resp;
            this.showFoundRepo = true;
            this.hideButton = true;
          }, 1000)
        }
      )
      .catch(
        (error: any) => {
          this.displayErrorFeedback();
          setTimeout(() => {
            this.hideFeedback = false;
            this.showFoundRepo = false;
            this.hideButton = true;
            this.hideList = true;
          }, 1000)
        }
      );
    this.repoToFind = ' ';
  }

  public displayRepos(): void {
    setTimeout(() => {
      this.reposService.displayRepos()
        .subscribe(
          (repos: any) => {
            this.repos = repos;
          }
        );
    }, 1000);
  }

  public addRepo(): void {
    this.reposService.addRepo(this.repoUrl!)
      .then(
        (resp) => {
          this.displayRepos();
        }
      )
      .catch(
        (error) => {
         console.log(error);
        }
      );
    this.repoUrl = " ";
  }

  public removeRepo(repo: Repos): void {
    this.reposService.removeRepo(repo);
    this.removeRepoFromScreen(repo);
  }

  public removeFoundRepo(foundRepoName: string): void {
    this.showFoundRepo = false;
    this.reposService.removeFoundRepo(foundRepoName);
  }

  public removeRepoFromScreen(repo: Repos): void {
    this.repos.splice(this.repos.indexOf(repo), 1);
  }

  public displayLoader(): void {
    this.hideButton = false;
    this.hideFeedback = true;
    document.getElementById("loader")!.classList.add("loader");
  }

  public displaySuccessFeedback(): void {
    this.hideLoader = false;
    document.getElementById("feedback")!.classList.add("loader-success");
    setTimeout(() => {
      this.resetElements()
    }, 2000);
  }

  public displayErrorFeedback(): void {
    this.hideLoader = false;
    document.getElementById("feedback")!.classList.add("loader-error");
    let input: HTMLInputElement = <HTMLInputElement>document.getElementById("search");
    this.displayInputErrorFeedback(input);

    setTimeout(() => {
      this.resetInputLayout(input);
    }, 1000)
  }

  public displayInputErrorFeedback(input: HTMLInputElement): void {
    input.classList.add("repo-not-found");
    input.value = 'Repositório não encontrado...';
    setTimeout(() => {
      input.value = '';
    }, 1000)
  }

  public resetInputLayout(input: HTMLInputElement): void {
    input.classList.remove("repo-not-found");
    input.classList.add("reset-input");
    this.resetElements();
  }

  public resetElements(): void {
    this.hideButton = true;
    this.hideLoader = true;
    this.hideFeedback = true;
  }

}
