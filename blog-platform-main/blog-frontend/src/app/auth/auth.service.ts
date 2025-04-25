import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environment/environment';


interface AuthResponse {
  token: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  // другие поля профиля
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, { username, password }).pipe(
      tap(response => {
        if (!response.token) {
          throw new Error('No token received in response');
        }
        localStorage.setItem('token', response.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/posts']);
      })
    );
  }

  register(userData: UserData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, userData).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // getCurrentUserId(): number | null {
  //   const token = this.getToken();
  //   if (!token) return null;
    
  //   try {
  //     const decodedToken = this.jwtHelper.decodeToken(token);
  //     return decodedToken.user_id || null; // Используйте актуальное поле из вашего токена
  //   } catch (e) {
  //     console.error('Error decoding token:', e);
  //     return null;
  //   }
  // }

  getCurrentUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded.user_id; // Или другое поле, где хранится ID
    } catch {
      return null;
    }
  }

  checkAuthentication(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Проверяем, не истек ли токен
    return !this.jwtHelper.isTokenExpired(token);
  }
  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/profile/`);
  }
}