import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Director } from '../models/director.model';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private apiUrl = `${environment.apiUrl}/directors`;

  constructor(private http: HttpClient) { }

  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(this.apiUrl);
  }
}
