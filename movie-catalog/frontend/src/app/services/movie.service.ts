import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environment';
import { Movie, MovieParams } from '../models/movie.model';
import { Genre } from '../models/genre.model';
import { Director } from '../models/director.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Получение фильмов с возможностью фильтрации
  getMovies(params?: MovieParams): Observable<{results: Movie[], count: number}> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof MovieParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
  
    return this.http.get<{results: Movie[], count: number}>(`${this.apiUrl}/movies/`, { params: httpParams });
  }

  // Получение одного фильма
  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}/`).pipe(
      catchError(this.handleError)
    );
  }

  // Получение всех жанров
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres/`).pipe(
      catchError(this.handleError)
    );
  }

  // Получение всех режиссёров
  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(`${this.apiUrl}/directors/`).pipe(
      catchError(this.handleError)
    );
  }

  // Обработка ошибок
  private handleError(error: HttpErrorResponse) {
    console.error('Произошла ошибка:', error);
    return throwError(() => new Error('Что-то пошло не так. Пожалуйста, попробуйте позже.'));
  }
}