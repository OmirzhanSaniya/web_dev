import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  // standalone: true
})
export class AppComponent {
  title = 'product-app';
}
