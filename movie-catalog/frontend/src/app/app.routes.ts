import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' },
  { path: '', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];