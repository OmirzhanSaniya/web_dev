import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/vacancy';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private apiUrl = 'http://localhost:8000/api/vacancies/';

  constructor(private http: HttpClient) { }

  getVacanciesByCompany(companyId: number): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.apiUrl}by_company/${companyId}/`);
  }

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrl);
  }

  getVacancy(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.apiUrl}${id}/`);
  }
}