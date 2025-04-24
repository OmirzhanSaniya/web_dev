import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatButtonModule } from "@angular/material/button";
import { Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert('Error logging in')
    });
  }
}