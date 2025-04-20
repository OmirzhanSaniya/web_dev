import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  template: `
    <mat-card class="auth-card">
      <h2>Регистрация</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field>
          <input matInput [(ngModel)]="userData.username" name="username" placeholder="Логин" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="userData.email" name="email" placeholder="Email" type="email" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="userData.password" name="password" placeholder="Пароль" type="password" required>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Зарегистрироваться</button>
      </form>
      <p>Уже есть аккаунт? <a routerLink="/login">Войти</a></p>
    </mat-card>
  `
})
export class RegisterComponent {
  userData = { username: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.userData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error(err)
    });
  }
}