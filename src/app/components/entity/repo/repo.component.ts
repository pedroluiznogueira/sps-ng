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

  filteredRepos$!: Observable<Repos[]>;
  searchTerms = new Subject<string>();
  repos: Array<Repos> = new Array();
  repoUrl?: string;

  constructor(
    private reposService: ReposService
  ) { }

  ngOnInit(): void {
    this.displayRepos();

    this.filteredRepos$ = this.searchTerms
      .pipe(
        debounceTime(300),

        distinctUntilChanged(),

        switchMap((term: string) => this.reposService.findRepo(term)),
      );
  }

  public findRepo(term: string): void {
    this.searchTerms.next(term);
  }

  public displayRepos(): void {
    setTimeout(() => {
      this.reposService.displayRepos()
        .subscribe(
          (repos: any) => {
            this.repos = repos;
          }
        );
    }, 3000);
  }

  public addRepo(): void {
    console.log(this.repoUrl);
    this.reposService.addRepo(this.repoUrl!);
    this.repoUrl = " ";
  }

  public removeRepo(repo: Repos): void {
    this.reposService.removeRepo(repo);
  }

}
