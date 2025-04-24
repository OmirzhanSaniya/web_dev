import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) {
    if (this.isAuthenticated()) {
      this.loadUserProfile();
    }
  }

  get authStatus$() {
    return this.isAuthSubject.asObservable();
  }

  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  register(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register/`, userData).pipe(
      tap((res: any) => {
        if (res.token) {
          this.handleAuthentication(res.token);
        }
      })
    );
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/token/`, credentials).pipe(
      tap((res: any) => {
        this.handleAuthentication(res.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.isAuthSubject.next(false);  
    this.currentUserSubject.next(null); 
  }  

  getProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile/`).pipe(
      tap(profile => this.currentUserSubject.next(profile))
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private handleAuthentication(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthSubject.next(true);
    this.loadUserProfile();
  }

  private handleLogout(): void {
    localStorage.removeItem('token');
    this.isAuthSubject.next(false);
    this.currentUserSubject.next(null);
  }

  private loadUserProfile(): void {
    this.getProfile().subscribe({
      error: () => this.handleLogout()
    });
  }
}