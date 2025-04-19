import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { GenreService } from '../../services/genre.service';
import { DirectorService } from '../../services/director.service';
import { Movie, MovieParams } from '../../models/movie.model';
import { Genre } from '../../models/genre.model';
import { Director } from '../../models/director.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from "../../truncate.pipe";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TruncatePipe],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  genres: Genre[] = [];
  directors: Director[] = [];
  params: MovieParams = {};
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 10;
  loading = false;
  error: string | null = null;

  constructor(
    private movieService: MovieService,
    private genreService: GenreService,
    private directorService: DirectorService
  ) { }

  ngOnInit(): void {
    this.loadGenres();
    this.loadDirectors();
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.error = null;
    this.params.page = this.currentPage;
    
    this.movieService.getMovies(this.params).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.totalItems = response.count;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load movies';
        this.loading = false;
        console.error('Error loading movies:', error);
      }
    });
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: (error) => {
        console.error('Error loading genres:', error);
      }
    });
  }

  loadDirectors(): void {
    this.directorService.getDirectors().subscribe({
      next: (directors) => {
        this.directors = directors;
      },
      error: (error) => {
        console.error('Error loading directors:', error);
      }
    });
  }

  onSearch(params: MovieParams): void {
    this.params = { ...this.params, ...params };
    this.currentPage = 1;
    this.loadMovies();
  }

  resetFilters(): void {
    this.params = {};
    this.currentPage = 1;
    this.loadMovies(); // Прямой вызов вместо onSearch()
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMovies();
  }

  getPaginationArray(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}