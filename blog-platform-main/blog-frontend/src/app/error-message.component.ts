import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-message">
      {{ message }}
    </div>
  `,
  styles: [`
    .error-message {
      color: #d32f2f;
      background-color: #fde8e8;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      text-align: center;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string = 'An error occurred';
}