import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Input() showActions: boolean = true;
  filteredMovies: Movie[] = [];
  genres: string[] = [];
  selectedGenre: string = '';
  sortOption: string = '';
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
      this.filteredMovies = [...this.movies];
      this.extractGenres();
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
        this.filteredMovies = [...this.movies];
        this.extractGenres();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading movies', err);
        this.isLoading = false;
      }
    });
  }

  extractGenres(): void {
    const genreSet = new Set<string>();
    this.movies.forEach(movie => {
      movie.genres?.forEach(genre => genreSet.add(genre.name));
    });
    this.genres = Array.from(genreSet);
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie => {
      const matchesGenre = this.selectedGenre ? movie.genres?.some(g => g.name === this.selectedGenre) : true;
      return matchesGenre;
    });
    this.sortMovies();
  }

  sortMovies(): void {
    if (this.sortOption === 'rating') {
      this.filteredMovies.sort((a, b) => (b.imdb_rating || 0) - (a.imdb_rating || 0));
    } else if (this.sortOption === 'year') {
      this.filteredMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.filterMovies();
  }

  onSortChange(option: string): void {
    this.sortOption = option;
    this.sortMovies();
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
      next: () => {
        this.loadUserData();
      },
      error: (err) => console.error('Error toggling favorite status', err)
    });
  }  

  getGenreNames(movie: Movie): string {
    return movie.genres?.map(g => g.name).join(', ') || '';
  }
} 