import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/movies';

  constructor(private http: HttpClient) { }

  // Основные методы для работы с фильмами
  getMovies(): Observable<Movie[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.results || response)
    );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Методы для работы с избранным и просмотренными
  toggleWatched(movieId: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/profile/watch/`, { movie_id: movieId });
  }

  toggleFavorite(movieId: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/profile/favorite/`, { movie_id: movieId });
  }

  getWatchedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://127.0.0.1:8000/profile/?action=watched');
  }

  getFavoriteMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://127.0.0.1:8000/profile/?action=favorites');
  }
}