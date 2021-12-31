import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { RepoComponent } from './components/entity/repo/repo.component';
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';
import { HomeComponent } from './components/layout/home/home.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent,
    children: [
      { path: '', component: RepoComponent }
    ]
  },
  {
    path: '', component: AuthenticationComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
