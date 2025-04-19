import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Genre } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = `${environment.apiUrl}/genres`;

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }
}
