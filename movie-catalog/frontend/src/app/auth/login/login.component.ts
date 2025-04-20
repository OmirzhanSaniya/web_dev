import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatButtonModule } from "@angular/material/button";
import { Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="credentials.username" name="username" placeholder="Логин">
      <input [(ngModel)]="credentials.password" name="password" type="password" placeholder="Пароль">
      <button type="submit">Войти</button>
      <p>Нет аккаунта? <a routerLink="/register">Зарегистрируйтесь</a></p>
    </form>
  `
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert('Ошибка входа')
    });
  }
}
