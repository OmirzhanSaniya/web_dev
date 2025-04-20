import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Input() showActions = true;
  showDefaultPoster = true; 
  
  watchedMovies: number[] = [];
  favoriteMovies: number[] = [];
  isLoading = true;

  constructor(
    private movieService: MovieService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.movies.length === 0) {
      this.loadMovies();
    } else {
      this.isLoading = false;
    }
    
    if (this.isAuthenticated()) {
      this.loadUserData();
    }
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.movieService.getMovies().subscribe({
      next: (response: any) => {
        this.movies = response.results ? response.results : response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading movies', err);
        this.isLoading = false;
      }
    });
  }

  loadUserData(): void {
    this.auth.getProfile().subscribe({
      next: (profile) => {
        this.watchedMovies = profile.watched_movies?.map((m: any) => m.id) || [];
        this.favoriteMovies = profile.favorite_movies?.map((m: any) => m.id) || [];
      },
      error: (err) => console.error('Error loading user data', err)
    });
  }

  isWatched(movieId: number | undefined): boolean {
    return movieId ? this.watchedMovies.includes(movieId) : false;
  }

  isFavorite(movieId: number | undefined): boolean {
    return movieId ? this.favoriteMovies.includes(movieId) : false;
  }

  toggleWatched(movieId: number | undefined): void {
    if (!movieId) return;
    this.movieService.toggleWatched(movieId).subscribe({
      next: () => this.loadUserData(),
      error: (err) => console.error('Error toggling watched status', err)
    });
  }

  toggleFavorite(movieId: number | undefined): void {
    if (!movieId) return;
    this.movieService.toggleFavorite(movieId).subscribe({
      next: () => this.loadUserData(),
      error: (err) => console.error('Error toggling favorite status', err)
    });
  }

  deleteMovie(id: number | undefined): void {
    if (!id || !confirm('Удалить фильм?')) return;
    this.movieService.deleteMovie(id).subscribe({
      next: () => this.movies = this.movies.filter(m => m.id !== id),
      error: (err) => console.error('Error deleting movie', err)
    });
  }
}