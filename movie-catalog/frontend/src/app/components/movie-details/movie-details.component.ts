import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  loading = false;
  error: string | null = null;
similarMovies: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    this.loading = true;
    this.error = null;
    
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Invalid movie ID';
      this.loading = false;
      return;
    }

    this.movieService.getMovie(+id).subscribe({
      next: (movie) => {
        // Приводим данные к правильному формату
        this.movie = {
          ...movie,
          genres: movie.genres || [],
          director: movie.director || { id: 0, name: 'Unknown Director' }
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load movie details';
        this.loading = false;
        console.error('Error loading movie:', err);
      }
    });
  }
}