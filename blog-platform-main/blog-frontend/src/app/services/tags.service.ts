import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiUrl = 'http://localhost:8000/api/tags';

  constructor(private http: HttpClient) {}

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}