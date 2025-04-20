import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MovieListComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  watchedMovies: Movie[] = [];
  favoriteMovies: Movie[] = [];
  isLoading = true;

  constructor(
    private auth: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.isLoading = true;
    
    this.auth.getProfile().subscribe({
      next: (profile) => {
        this.watchedMovies = profile.watched_movies || [];
        this.favoriteMovies = profile.favorite_movies || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading profile', err);
        this.isLoading = false;
      }
    });
  }
}