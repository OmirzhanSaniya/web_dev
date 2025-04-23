import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockMovieService {
  private movies: Movie[] = [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010, description: 'A mind-bending thriller...', posterUrl: 'assets/inception.jpg' },
    { id: 2, title: 'The Godfather', genre: 'Crime', year: 1972, description: 'Mafia drama...', posterUrl: 'assets/godfather.jpg' },
    // ...добавьте ещё фильмов
  ];

  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const movie = this.movies.find(m => m.id === id);
    return of(movie);
  }
}
