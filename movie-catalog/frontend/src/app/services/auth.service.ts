import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) {
    // Проверяем токен при инициализации
    if (this.isAuthenticated()) {
      this.loadUserProfile();
    }
  }

  // Observable для подписки на изменения статуса аутентификации
  get authStatus$() {
    return this.isAuthSubject.asObservable();
  }

  // Observable для подписки на данные пользователя
  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  register(userData: {username: string, email: string, password: string}): Observable<any> {
    return this.http.post('/api/register/', userData).pipe(
      tap((res: any) => {
        if (res.token) {
          this.handleAuthentication(res.token);
        }
      })
    );
  }

  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post('/api/login/', credentials).pipe(
      tap((res: any) => {
        this.handleAuthentication(res.token);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post('/api/logout/', {}).pipe(
      tap(() => {
        this.handleLogout();
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get('/api/profile/').pipe(
      tap(profile => {
        this.currentUserSubject.next(profile);
      })
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