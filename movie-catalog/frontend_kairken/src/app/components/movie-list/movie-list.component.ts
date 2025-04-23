import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MockMovieService } from '../../services/mock-movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent {
  movies: Movie[] = [];
  filtered: Movie[] = [];
  searchTerm = '';
  genreFilter = '';
  genres: string[] = [];

  constructor(private service: MockMovieService) {
    this.service.getMovies().subscribe(ms => {
      this.movies = ms;
      this.filtered = ms;
      this.genres = Array.from(new Set(ms.map(m => m.genre)));
    });
  }

  applyFilters() {
    this.filtered = this.movies
      .filter(m => m.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .filter(m => this.genreFilter ? m.genre === this.genreFilter : true);
  }
}
